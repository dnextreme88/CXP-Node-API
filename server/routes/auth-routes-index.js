const express = require('express');

const router = express.Router();

// Require the index file
const authRoutes = require('./auth-routes');

module.exports = (params) => {
    // Routes start with passport/, which is defined under server/index.js
    router.use('/user', authRoutes(params));

    // Return the router object
    return router;
};
