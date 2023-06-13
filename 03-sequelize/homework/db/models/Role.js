const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  // Role
// name*: string (Dene ser único)
// description: string
  sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    }
  })
}