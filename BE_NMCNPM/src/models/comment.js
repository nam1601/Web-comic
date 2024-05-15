'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Comment.init({
    mangaEp: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,   
    modelName: 'Comment',
    updatedAt: false,
  });
  return Comment;
};
