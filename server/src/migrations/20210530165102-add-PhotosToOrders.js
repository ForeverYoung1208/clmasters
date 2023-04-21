'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'thumbnailUrl', {
      type: Sequelize.DataTypes.STRING,
      unique: false,
      allowNull: true,
    })
    
    await queryInterface.addColumn('Orders', 'photoPublicId', {
      type: Sequelize.DataTypes.STRING,
      unique: false,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'thumbnailUrl')
    await queryInterface.removeColumn('Orders', 'photoPublicId')
  },
}
