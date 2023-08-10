require('dotenv').config();

const envir = process.env.NODE_ENV || 'development';
const config = require('./index')[envir].database;

module.exports = {
    [envir]: {
        host: config.hostName,
        port: config.portNumber,
        // logging: false,
        username: config.username,
        password: config.password,
        database: config.database,
        dialect: config.dialect,
        // dialectOptions: {
        //   useUTC: false,
        //   dateStrings: true,
        //   typeCast: true
        // },
        // timezone: 'America/Los_Angeles'
    },
};
