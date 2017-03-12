const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password_sha: {
      type: DataTypes.STRING(100),
    }
  }, {
    tableName: 'user',
    comment: 'user base information',
    indexes: [
      {
        unique: true,
        fields: ['email'],
      }
    ]
  });
}
