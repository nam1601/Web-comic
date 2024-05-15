module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Histories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        mangaEp: {
          type: Sequelize.STRING
        },
        title:{
          type: Sequelize.STRING
        },
        currentChap: {
          type: Sequelize.STRING
        },
        cover:{
          type: Sequelize.STRING
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
      await queryInterface.dropTable('Histories');
    }
  };