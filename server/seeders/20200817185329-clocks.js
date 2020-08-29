'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Clocks', 
      [
        {
          id:1,
          type: 'Small',
          repairTime: '1:00',
          comment: '',
        },
        {
          id:2,          
          type: 'Medium',
          repairTime: '2:00',
          comment: '',
        },
        {
          id:3,          
          type: 'Big',
          repairTime: '3:00',
          comment: '',
        }
      ], {}
    );
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Clocks_id_seq" RESTART WITH 100`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clocks', {type: ['Small','Medium','Big']}, {});

  }
};
