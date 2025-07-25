const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Symptom = sequelize.define('symptoms', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Symptom;
}; 