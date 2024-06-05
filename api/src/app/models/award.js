'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Award.belongsTo(models.Dtnk, {
        sourceKey: "id",
        foreignKey: "id_Dtnk",
      });
      Award.belongsTo(models.User, {
        sourceKey: "id",
        foreignKey: "id_user",
      });
    }
  }
  Award.init({
    id_user: DataTypes.STRING,
    id_Dtnk: DataTypes.STRING,
    nameAward: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Award',
  });
  return Award;
};