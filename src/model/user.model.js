const { DataTypes, Model } = require('sequelize');

class User extends Model {}

exports.init = (sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.BOOLEAN,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    adress: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};
