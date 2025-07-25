const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Specialty = sequelize.define('specialties', {
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
  return Specialty;
}; 