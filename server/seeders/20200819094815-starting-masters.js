'use strict'

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Masters', 
      [
        {
          id:1,
          name: 'Master 1',
          comment: 'Initial master1',
          cityId:1,
          rating: 0,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        },
        {
          id:2,
          name: 'Master 2',
          comment: 'Initial master2',
          cityId:1,          
          rating: 2,          
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        },
        {
          id:3,
          name: 'Master 3',
          comment: 'Initial master3',
          cityId:2,
          rating: 3,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        },
        {
          id:4,
          name: 'Master 4',
          comment: 'Initial master4',
          cityId:2,          
          rating: 4,          
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),          
        }
      ], {}
    )
    await queryInterface.sequelize.query('ALTER SEQUENCE "Masters_id_seq" RESTART WITH 100')
      
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Masters', {id: [1,2,3,4]}, {})
  }

}
