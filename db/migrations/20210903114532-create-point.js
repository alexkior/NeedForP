'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Points', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: 'Users' },
            key: 'id'
        }
    },
      user: {
        type: Sequelize.STRING
      },
      coordslat: {
        type: Sequelize.FLOAT
      },
      coordslon: {
        type: Sequelize.FLOAT
      },
      text: {
        type: Sequelize.STRING
      },
      havetopay: {
        type: Sequelize.BOOLEAN
      },
      rate: {
        type: Sequelize.INTEGER
      },
      likes: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Points');
  }
};
