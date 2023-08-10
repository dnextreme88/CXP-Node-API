/* eslint-disable global-require */
/* eslint-disable max-len */
require('dotenv').config(); // Import dotenv for JWT key
const bcrypt = require('bcrypt');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const uuid = require('uuid').v4;
const db = require('../models');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'config/passport.js', stream: formatOut, level: 'info' });

// Export local strategies, passing the "Passport" module
module.exports = (passport) => {
    const LocalStrategy = require('passport-local').Strategy;
    // Tell passport to use a new LocalStrategy called "local-signup"
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email', // Setting the authenticating email to be the inputted email
            passwordField: 'password', // Setting the authenticating password to be the inputted password
            // Pass the entire request to the callback function so we can encrypt the password and add an entry into the Sequelize table
            passReqToCallback: true,
            // Make sure Passport doesn't use session storage, as we'll be setting JWT to local storage client side
            session: false,
        }, async (req, email, password, done) => {
            const user = await db.User.findOne({
                where: { Email: email },
                include: [
                    { model: await db.PodUser },
                    {
                        model: await db.UserRole,
                        include: { model: await db.Role },
                    },
                ],
            });
            if (user) {
                logger.error('Email is already taken');
                // Return error: null, user: false, info: { message, status }
                return done(null, false, { message: 'Email is already taken.', status: 400 });
            }

            // Encrypt the user's password using the bcrypt helper function
            const userPassword = await bcrypt.hashSync(password, await bcrypt.genSaltSync(12), null);
            const data = {
                Id: uuid(),
                Email: req.body.email,
                PasswordHash: userPassword,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                UserTypeId: req.body.userTypeId,
                DsTypeId: req.body.dsTypeId,
            };
            const newUser = await db.User.create(data);
            if (!newUser) {
                logger.error('Our servers are under a heavy load right now. Please try again in a moment.');
                // Return error: null, user: false, info: { message, status }
                return done(null, false, { message: 'Our servers are under a heavy load right now. Please try again in a moment.', status: 500 });
            }

            logger.info('User successfully created');
            // Return error: null, user: newUser
            return done(null, newUser);
        },
    ));

    // Tell passport to use a new LocalStrategy called "local-signin"
    passport.use('local-signin', new LocalStrategy(
        {
            // By default, Passport LocalStrategy uses a username and a password
            usernameField: 'email', // Setting the authenticating email to be the inputted email
            passwordField: 'password', // Setting the authenticating password to be the inputted password
            // Pass the entire request to the callback function to compare email/password to those stored in the User table
            passReqToCallback: true,
            // Make sure Passport doesn't use session storage, as we'll be setting JWT to local storage client side
            session: false,
        }, async (req, email, password, done) => {
            const user = await db.User.findOne({
                where: { Email: email },
                include: [
                    { model: await db.PodUser },
                    {
                        model: await db.UserRole,
                        include: { model: await db.Role },
                    },
                ],
            });
            if (user) {
                // Compare two passwords - user entered password and password stored in the User table
                const isValidPassword = await bcrypt.compare(password, user.PasswordHash);
                if (!isValidPassword) {
                    logger.error('Incorrect password');
                    // Return error: null, user: false, info: { message, status }
                    return done(null, false, { message: 'Incorrect password.', status: 400 });
                }

                logger.info('Storing user information to JWT payload');
                const userInfo = user.get(); // Stores all user fields
                // Return error: null, user: authenticated user information
                return done(null, userInfo);
            }

            logger.error('Email does not exist in our database');
            // Return error: null, user: false, info: { message, status }
            return done(null, false, { message: 'Email does not exist in our database', status: 500 });
        },
    ));
    // Import JSON Web Token strategies from passport-jwt
    const JWTstrategy = require('passport-jwt').Strategy;
    const ExtractJWT = require('passport-jwt').ExtractJwt;

    // Define options for JWT to extract from Auth Header using secret key
    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_OR_KEY,
    };

    passport.use('jwt', new JWTstrategy(opts, async (jwtPayload, done) => {
        logger.info('JWT Payload: ', jwtPayload);

        const user = await db.User.findOne({
            where: { Id: jwtPayload.id },
        });
        if (user) {
            logger.info('User found in database');
            const userJwt = {
                id: jwtPayload.id,
                email: jwtPayload.email,
                tenantId: jwtPayload.tenantId,
                podId: jwtPayload.podId,
                role: jwtPayload.role,
                issuedAt: new Date(jwtPayload.iat * 1000).toUTCString(),
                notBefore: new Date(jwtPayload.nbf * 1000).toUTCString(),
                expiresIn: new Date(jwtPayload.exp * 1000).toUTCString(),
            };
            // Return error: null, user: userJwt
            return done(null, userJwt);
        }

        logger.error('User not found in database');
        // Return error: null, user: false, info: { message, status }
        return done(null, false, { message: 'User not found in database', status: 500 });
    }));

    // Save the user id (the second argument of the done function) in a session. It is later used
    // to retrieve the whole object via the deserializeUser function
    passport.serializeUser((auth, done) => {
        done(null, auth.Id);
    });

    // Retrieve the user id from the stored session
    passport.deserializeUser((id, done) => {
        // Check the User table for a matching user id and pass the user information into the parameter of the callback function
        db.User.findById(id).then((user) => {
            if (user) {
                // Return error: null, and the user's authentication information
                return done(null, user.get());
            }
            // Otherwise, the user's id was not found, or the session was destroyed
            // Return the specific error, user: null
            return done(user.errors, null);
        });
    });
};
