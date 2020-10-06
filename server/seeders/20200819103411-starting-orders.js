'use strict'

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Orders', 
      [
        {
          id:1,
          comment: 'Initial order1',
          userId:1,
          onTime:'2020-08-20T13:00:00.000Z',
          clockId:1,
          // allocatedTime:'1:00',
          masterId: 1,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),               
        },
        {
          id:2,
          comment: 'Initial order2',
          userId:1,
          onTime:'2020-08-20T15:00:00.000Z',
          clockId:1,
          // allocatedTime:'1:00',
          masterId: 2,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),               
        }
      ], {})

    // dat works, mazafaka!!!! double quotes!
    // select nextval('"Users_id_seq"'::regclass)
    // select nextval('"Users_id_seq"')
    // eslint-disable-next-line quotes
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Orders_id_seq" RESTART WITH 100`)

    
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', {id: [1,2]}, {})
  }

}
