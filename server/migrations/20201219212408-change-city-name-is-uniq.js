'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Cities', 'name', {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Cities', 'name', {
      unique: false,
      allowNull: true,
    })
  },
}
