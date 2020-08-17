'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Cities', 
      [
        {
          name: 'Dnipro',
          comment: 'Initial city1',
        },
        {
          name: 'Uzhgorod',
          comment: 'Initial city2',
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', {name: ['Dnipro','Uzhgorod']}, {});

  }
};