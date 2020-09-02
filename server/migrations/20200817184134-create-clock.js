'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      repairTime: {
        type: Sequelize.TIME
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clocks')
  }
}