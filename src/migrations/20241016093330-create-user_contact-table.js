'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_contact', {
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_contact');
  }
};
