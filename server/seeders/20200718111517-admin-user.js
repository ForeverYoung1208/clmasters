require('dotenv').config()
const bcrypt = require('bcryptjs')
const SALTROUNDS = process.env.SECUR_SALTROUNDS


module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    //Add seed commands here.

    await queryInterface.bulkInsert('Users', 
      [
        {
          id:1,
          name: 'Ihor',
          email: 'siafin2010@gmail.com',
          password: await bcrypt.hash('123456', SALTROUNDS),
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
          isAdmin: true
        },
        {
          id:2,
          name: 'admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('passwordsecret', SALTROUNDS),
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
          isAdmin: true
        }
      ], {}
    )
    await queryInterface.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 100')

  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    // Add commands to revert seed here.

    await queryInterface.bulkDelete('Users', {email: ['siafin2010@gmail.com','admin@example.com']}, {})

  }
}
