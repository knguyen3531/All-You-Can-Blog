const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // Use JawsDB URL if available (on Heroku)
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Fall back to local configuration
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            port: process.env.DB_PORT
        }
    );
}

module.exports = sequelize;
