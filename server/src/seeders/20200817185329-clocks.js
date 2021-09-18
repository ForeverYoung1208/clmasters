'use strict'

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Clocks', 
      [
        {
          id:1,
          type: 'Small',
          repairTime: '1:00',
          comment: '',
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        },
        {
          id:2,          
          type: 'Medium',
          repairTime: '2:00',
          comment: '',
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        },
        {
          id:3,          
          type: 'Big',
          repairTime: '3:00',
          comment: '',
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        }
      ], {}
    )
    await queryInterface.sequelize.query('ALTER SEQUENCE "Clocks_id_seq" RESTART WITH 100')

  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clocks', {type: ['Small','Medium','Big']}, {})

  }
}
