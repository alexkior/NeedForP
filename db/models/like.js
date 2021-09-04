'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({ User, Like }) {
      this.belongsTo(User, { foreignKey: 'id' })
      this.belongsTo(Like, { foreignKey: 'like' })
    }
  };
  Like.init({
    pointid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
