'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Orders', 
      [
        {
          id:1,
          comment: 'Initial order1',
          UserId:1,
          onTime:'2020-08-20T13:00:00.000Z',
          ClockId:1,
          allocatedTime:'1:00',
          MasterId:1
        },
        {
          id:2,
          comment: 'Initial order2',
          UserId:1,
          onTime:'2020-08-20T15:00:00.000Z',
          ClockId:1,
          allocatedTime:'1:00',
          MasterId:2
        }
      ], {});

    // dat works, mazafaka!!!! double quotes!
    // select nextval('"Users_id_seq"'::regclass)
    // select nextval('"Users_id_seq"')
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Orders_id_seq" RESTART WITH 100`);

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', {id: [1,2]}, {});
  }

};
