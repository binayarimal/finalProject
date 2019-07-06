'use strict';
module.exports = (sequelize, DataTypes) => {
  var Collab = sequelize.define('Collab', {
    shopListId:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    email:{  allowNull: false,
      type: DataTypes.INTEGER},
      userId:{
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, {});
    Collab.associate = function(models) {
      Collab.belongsTo(models.ShopList, {
        foreignKey: "shopListId",
        onDelete: "CASCADE"
      });
      Collab.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
    };
    return Collab;
  };
