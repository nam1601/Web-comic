'use strict';
const sequelize = require('sequelize');
const User = require('./user')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follow.belongsTo(models.User, { foreignKey: 'id' });
    }  
  };
  Follow.init({
    userId: DataTypes.INTEGER,
    mangaEp: DataTypes.STRING,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    lastChap: DataTypes.STRING,
    newChap: DataTypes.STRING,
    lastUpdate: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Follow',
    createdAt: false, // Tắt cột createdAt    
    updatedAt: false,
  });
  return Follow;
};
