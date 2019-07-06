'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    shopListId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    status: {
     type: DataTypes.TEXT,
     allowNull: false,
     defaultValue: "added"
   }
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.ShopList, {
      foreignKey: "shopListId",
      onDelete: "CASCADE"
    });
  };
  return Item;
};
