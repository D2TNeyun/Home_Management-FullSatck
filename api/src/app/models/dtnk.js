'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dtnk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dtnk.belongsTo(models.User, {
        sourceKey: "id",
        foreignKey: "id_User",
      });

      Dtnk.hasMany(models.Award, {
        sourceKey: "id",
        foreignKey: "id_Dtnk",
      });
    }
  }
  Dtnk.init({
    id_User: DataTypes.STRING,
    nameDtnk: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    img: DataTypes.STRING,
    year: DataTypes.DATE
    
  }, {
    sequelize,
    modelName: 'Dtnk',
  });
  return Dtnk;
};