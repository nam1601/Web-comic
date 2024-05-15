module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Follows', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        mangaEp: {
          type: Sequelize.STRING
        },
        title:{
          type: Sequelize.STRING,
        },
        cover:{
          type: Sequelize.STRING,
        },
        lastChap: {
          type: Sequelize.STRING
        },
        newChap: {
          type: Sequelize.STRING,
        },
        lastUpdate: {
          type: Sequelize.STRING
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Follows');
    }
  };