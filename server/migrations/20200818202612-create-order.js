'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clockId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clocks',        // Name of Target model
          key: 'id',              // Key in Target model that we're referencing
        },        

      },
      masterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Masters',        // Name of Target model
          key: 'id',              // Key in Target model that we're referencing
        },        

      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',        // Name of Target model
          key: 'id',              // Key in Target model that we're referencing
        },        

      },
      comment: {
        type: Sequelize.STRING
      },
      onTime: {
        type: Sequelize.DATE
      },
      allocatedTime: {
        type: Sequelize.TIME
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders')
  }
}