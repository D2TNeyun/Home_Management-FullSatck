'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Department, {
        sourceKey: "id",
        foreignKey: "id_Department",
      });

      User.hasMany(models.Dtnk, {
        sourceKey: "id",
        foreignKey: "id_User",
      });
      User.hasMany(models.Award, {
        sourceKey: "id",
        foreignKey: "id_user",
      });
    }
  }
  User.init({
    id_Department: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};