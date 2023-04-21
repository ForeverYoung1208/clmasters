'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Masters', 'hourRate', {
      type: Sequelize.DataTypes.DECIMAL(14, 2),
      unique: false,
      allowNull: false,
      defaultValue: '0'
    })
    await queryInterface.addColumn('Orders', 'price', {
      type: Sequelize.DataTypes.DECIMAL(14, 2),
      unique: false,
      allowNull: true,
    })

    await queryInterface.addColumn('Masters', 'isActive', {
      type: Sequelize.DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: 'true',
    })
    
    await queryInterface.addColumn('Cities', 'isActive', {
      type: Sequelize.DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: 'true',
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Masters', 'hourRate')
    await queryInterface.removeColumn('Orders', 'price')
    await queryInterface.removeColumn('Masters', 'isActive')
    await queryInterface.removeColumn('Cities', 'isActive')
  },
}
