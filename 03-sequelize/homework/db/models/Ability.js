const { DataTypes } = require('sequelize');

module.exports = sequelize => {
//   Ability
// name*: string
// description: text
// mana_cost*: float
// La combinación "name" + "mana_cost" debe ser única.
  sequelize.define('Ability', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'lololo'
  },
  description: {
    type: DataTypes.TEXT
  },
  mana_cost:{
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: 'lololo'
  }
}
  );
}