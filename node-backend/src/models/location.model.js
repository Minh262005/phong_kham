const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Location = sequelize.define('locations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Location;
}; 