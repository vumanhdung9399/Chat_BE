'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('12345678', saltRounds);

    return queryInterface.bulkInsert('users', [{
      username: 'dungvm8',
      email: 'dungvm8@fpt.com',
      password: hashedPassword,
      phone: '0386132297',
      fullName: 'Vu Manh Dung',
      is_active: false,
      is_reported: false,
      is_blocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
