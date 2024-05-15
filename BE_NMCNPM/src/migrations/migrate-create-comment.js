const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Comments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        mangaEp: {
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.INTEGER
        },
        cover: {
          type: Sequelize.STRING
        },
        title: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Comments');
    }
  };