'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postid: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Points' },
          key: 'id',
          onDelete:'CASCADE'
        }
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users' },
          key: 'id',
          onDelete:'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};
