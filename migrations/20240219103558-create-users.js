// Khoi-s-Blog\All-You-Can-Blog\migrations\20240219103558-create-users.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // Add other fields as necessary
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
