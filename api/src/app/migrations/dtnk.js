'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dtnks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_User: { type: Sequelize.STRING   },
      nameDtnk: {type: Sequelize.STRING  },
      description: { type: Sequelize.TEXT('long') },
      img: { type: Sequelize.STRING },
      year: { type: Sequelize.STRING},
      
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dtnks');
  }
};