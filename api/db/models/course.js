"use strict";
const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        notEmpty: true,
        allowNull: false
      },
      estimatedTime: { type: Sequelize.STRING, allowNull: true },
      materialsNeeded: { type: Sequelize.STRING, allowNull: true }
    },
    { sequelize }
  );

  Course.associate = models => {
    Course.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
      allowNull: false
    });
  };

  return Course;
};
