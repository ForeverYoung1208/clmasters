const bcrypt = require('bcryptjs');
const config = require('config');

const SALTROUNDS =  config.get('saltRounds')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', 
      [
        {
          name: 'Ihor',
          email: 'siafin2010@gmail.com',
          password: await bcrypt.hash('123456', SALTROUNDS),
          isAdmin: true
        },
        {
          name: 'admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('passwordsecret', SALTROUNDS),
          isAdmin: true
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {email: ['siafin2010@gmail.com','admin@example.com']}, {});

  }
};
