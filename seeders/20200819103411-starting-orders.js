'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Orders', 
      [
        {
          id:1,
          comment: 'Initial order1',
          UserId:1,
          ClockId:1,
          MasterId:1
        },
        {
          id:2,
          comment: 'Initial order2',
          UserId:1,          
          ClockId:1,
          MasterId:2
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', {id: [1,2]}, {});
  }

};
