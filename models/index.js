const Sequelize = require('sequelize');
require('dotenv').config(); // Ensure environment variables are read
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging, 
  });
}

// Import models
const User = require('./User')(sequelize);
const Post = require('./Post')(sequelize);
const Comment = require('./comment')(sequelize);

// Define model associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { sequelize, User, Post, Comment };
