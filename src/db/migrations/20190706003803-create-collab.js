'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Collabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING
      },
      shopListId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Collabs');
  }
};
