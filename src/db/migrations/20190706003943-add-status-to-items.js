'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
         "Items",
         "status",
         {
           type: Sequelize.STRING,
           allowNull: false,


           defaultValue: "added"
         }
       );
  },

    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn("Items", "status");
    }

};
