'use strict';
module.exports = (sequelize, DataTypes) => {
  var ShopList = sequelize.define('ShopList', {
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    description:{
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId:{
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  ShopList.associate = function(models) {
  ShopList.hasMany(models.Item, {
    foreignKey:"shopListId",
    as:"items"
  });
  ShopList.hasMany(models.Collab, {
    foreignKey:"shopListId",
    as:"collabs"
  });
  ShopList.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  }
  return ShopList;
};
