"use strict";
const Sequelize = require("sequelize");

// User Model for Sequelize

module.exports = sequelize => {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        validate: { notEmpty: true }
      },
      lastName: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        validate: { notEmpty: true }
      },
      emailAddress: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        validate: { notEmpty: true }
      },
      password: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    { sequelize }
  );

  User.associate = models => {
    User.hasMany(models.Course, {
      as: "user",
      foreignKey: {
        fieldname: "userId"
      }
    });
  };

  return User;
};
