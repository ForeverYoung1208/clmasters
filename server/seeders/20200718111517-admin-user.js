const bcrypt = require('bcryptjs');
// const SALTROUNDS =  config.get('saltRounds')
// const config = require('config');
require('dotenv').config()
const SALTROUNDS =  process.env.SECUR_SALTROUNDS=3


module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Add seed commands here.

    await queryInterface.bulkInsert('Users', 
      [
        {
          id:1,
          name: 'Ihor',
          email: 'siafin2010@gmail.com',
          password: await bcrypt.hash('123456', SALTROUNDS),
          isAdmin: true
        },
        {
          id:2,
          name: 'admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('passwordsecret', SALTROUNDS),
          isAdmin: true
        }
      ], {}
    );
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Users_id_seq" RESTART WITH 100`);

  },

  down: async (queryInterface, Sequelize) => {
    // Add commands to revert seed here.

    await queryInterface.bulkDelete('Users', {email: ['siafin2010@gmail.com','admin@example.com']}, {});

  }
};
