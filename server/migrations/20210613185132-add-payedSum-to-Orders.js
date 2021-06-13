'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'payedSum', {
      type: Sequelize.DataTypes.DECIMAL(14, 2),
      unique: false,
      allowNull: true,
    })

  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Orders', 'payedSum')
  },
}
