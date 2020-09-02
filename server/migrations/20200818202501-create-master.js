'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',        // Name of Target model
          key: 'id',              // Key in Target model that we're referencing
          onUpdate: 'NO ACTION',  // Default
        },        
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Masters')
  }
}

// To create an attribute with a foreign key relationship, use the "references" and "referencesKey" fields:

// For example, the following would create a users table, and a user_emails table which references the users table.

// queryInterface.createTable('users', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   }
// }).then(function() {
//   queryInterface.createTable('user_emails', {
//     userId: {
//       type: Sequelize.INTEGER,
//       references: { model: 'users', key: 'id' }
//     }
//   })
// });