'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Masters', 
      [
        {
          id:1,
          name: 'Master 1',
          comment: 'Initial master1',
          CityId:1,
        },
        {
          id:2,
          name: 'Master 2',
          comment: 'Initial master2',
          CityId:1,          
        },
        {
          id:3,
          name: 'Master 3',
          comment: 'Initial master3',
          CityId:2,
        },
        {
          id:4,
          name: 'Master 4',
          comment: 'Initial master4',
          CityId:2,          
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Masters', {id: [1,2,3,4]}, {});
  }

};
