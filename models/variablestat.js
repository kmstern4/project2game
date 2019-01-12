module.exports = function(sequelize, DataTypes) {
  var variableStat = sequelize.define("variableStat", {
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    evasion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hppotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    armorpiece: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    speedshoes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    specialsword: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
  variableStat.associate = function(models){
    variableStat.belongsTo(models.User, {
      as: "user",
      foriegnKey: "user_id",
      allowNull: false
    })
};
  return variableStat;
};