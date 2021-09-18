'use strict'

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Cities', 
      [
        {
          id:1,
          name: 'Dnipro',
          comment: '',
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
        },
        {
          id:2,
          name: 'Uzhgorod',
          comment: '',
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
        }
      ], {}
    )
    await queryInterface.sequelize.query('ALTER SEQUENCE "Cities_id_seq" RESTART WITH 100')

  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', {name: ['Dnipro','Uzhgorod']}, {})

  }
}
