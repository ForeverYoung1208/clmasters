'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Cities', 
      [
        {
          id:1,
          name: 'Dnipro',
          comment: '',
        },
        {
          id:2,
          name: 'Uzhgorod',
          comment: '',
        }
      ], {}
    );
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Cities_id_seq" RESTART WITH 100`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', {name: ['Dnipro','Uzhgorod']}, {});

  }
};
