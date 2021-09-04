'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Point, Like }) {
      // define association here
      // this.hasMany(Point, { foreignKey: 'userid' }),
      this.hasMany(Point, { foreignKey: 'id' });
      this.hasOne(Like, { foreignKey: 'id' });
  }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
