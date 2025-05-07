'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      showLastSeen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      showReadReceipp: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      joiningGroup: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      privateGroup: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      darkMode: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      borderedTheme: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      allowNotifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      keepNotifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};
