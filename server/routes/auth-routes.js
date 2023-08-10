require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../models');

const router = express.Router();

// Export our user Authorization routes
module.exports = () => {
    // POST route to signup using our local strategy 'local-signup'
    router.post('/signup', async (req, res, next) => {
        passport.authenticate('local-signup', async (err, user, info) => {
            if (!user) {
                return res.status(info.status).send({
                    auth: false,
                    message: info.message,
                    error: true,
                    statusCode: info.status,
                    data: null,
                });
            }

            // Upon successful signin and authentication, create a JWT and send a response
            const token = await jwt.sign(
                {
                    id: user.Id,
                    email: user.Email,
                    tenantId: user.TenantId,
                    podId: user.PodUser ? user.PodUser.PodId : null,
                    role: user.UserRole ? user.UserRole.Role.RoleName : null,
                }, process.env.JWT_SECRET_OR_KEY,
                {
                    expiresIn: '12h',
                    notBefore: '0',
                },
            );
            const tokenExpirationEpoch = new Date().setHours(new Date().getHours() + 12);
            const tokenExpiration = new Date(tokenExpirationEpoch).toUTCString();

            return res.status(201).send({
                auth: true,
                message: 'User created',
                error: false,
                statusCode: 201,
                data: { Token: token, TokenValidUntil: tokenExpiration, User: user },
            });
        })(req, res, next);
    });

    // POST route to sign in using our local strategy 'local-signin'
    router.post('/authenticate', async (req, res, next) => {
        passport.authenticate('local-signin', async (err, user, info) => {
            if (!user) {
                return res.status(info.status).send({
                    auth: false,
                    message: info.message,
                    error: true,
                    statusCode: info.status,
                    data: null,
                });
            }

            // Upon successful signin and authentication, create a JWT and send a response
            const token = await jwt.sign(
                {
                    id: user.Id,
                    email: user.Email,
                    tenantId: user.TenantId,
                    podId: user.PodUser ? user.PodUser.PodId : null,
                    role: user.UserRole ? user.UserRole.Role.RoleName : null,
                }, process.env.JWT_SECRET_OR_KEY,
                {
                    expiresIn: '12h',
                    notBefore: '0',
                },
            );
            const tokenExpirationEpoch = new Date().setHours(new Date().getHours() + 12);
            const tokenExpiration = new Date(tokenExpirationEpoch).toUTCString();

            return res.send({
                auth: true,
                message: 'User logged in',
                error: false,
                statusCode: 200,
                data: { Token: token, TokenValidUntil: tokenExpiration, User: user },
            });
        })(req, res, next);
    });

    // GET /getAuth?email={req.query.email}
    router.get('/getAuth', async (req, res, next) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (info) {
                let dataObj;
                if (info.name === 'JsonWebTokenError') {
                    dataObj = null;
                } else if (info.name === 'TokenExpiredError') {
                    dataObj = { expiredAt: info.expiredAt };
                }

                return res.status(403).send({
                    auth: false,
                    message: info.message,
                    error: true,
                    statusCode: 403,
                    data: dataObj,
                });
            }

            const findUser = await db.User.findOne({
                where: { Email: req.query.email },
            });
            if (!findUser) {
                return res.status(404).send({
                    auth: false,
                    message: 'No user exists in the database with that email',
                    error: true,
                    statusCode: 404,
                    data: null,
                });
            }

            return res.send({
                auth: true,
                message: 'User found in database',
                error: false,
                statusCode: 200,
                data: {
                    Id: user.id,
                    Email: user.email,
                    IssuedAt: user.issuedAt,
                    NotBefore: user.notBefore,
                    ExpiresIn: user.expiresIn,
                },
            });
        })(req, res, next);
    });

    // POST verify token
    router.post('/verifyJwt', async (req, res, next) => {
        try {
            jwt.verify(req.body.Token, process.env.JWT_SECRET_OR_KEY, async (error, decoded) => {
                if (error) {
                    let dataObj;
                    if (error.name === 'JsonWebTokenError') {
                        dataObj = null;
                    } else if (error.name === 'TokenExpiredError') {
                        dataObj = { expiredAt: error.expiredAt };
                    // If the payload information was malformed
                    } else {
                        dataObj = null;
                        error.message = 'jwt malformed';
                    }

                    return res.status(403).send({
                        auth: false,
                        message: error.message,
                        error: true,
                        statusCode: 403,
                        data: dataObj,
                    });
                }

                return res.send({
                    auth: true,
                    message: 'JWT Payload information',
                    error: false,
                    statusCode: 200,
                    data: {
                        Id: decoded.id,
                        Email: decoded.email,
                        TenantId: decoded.tenantId,
                        PodId: decoded.podId,
                        Role: decoded.role,
                        IssuedAt: new Date(decoded.iat * 1000).toUTCString(),
                        NotBefore: new Date(decoded.nbf * 1000).toUTCString(),
                        ExpiresIn: new Date(decoded.exp * 1000).toUTCString(),
                    },
                });
            });
        } catch (err) {
            next(err);
        }
    });

    return router;
};
