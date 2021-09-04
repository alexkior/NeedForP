'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate({ User, Like }) {
      this.belongsTo(User, { foreignKey: 'id' });
      this.hasMany(Like, { foreignKey: 'like' });
    }
  };
  Point.init({
    userid: DataTypes.INTEGER,
    user: DataTypes.STRING,
    coordslat: DataTypes.FLOAT,
    coordslon: DataTypes.FLOAT,
    text: DataTypes.STRING,
    havetopay: DataTypes.BOOLEAN,
    rate: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Point',
  });
  return Point;
};
