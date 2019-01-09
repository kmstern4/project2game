module.exports = function(sequelize, DataTypes) {
  var variableStat = sequelize.define("variableStat", {
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    evasion: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    }
  });
  return variableStat;
};
