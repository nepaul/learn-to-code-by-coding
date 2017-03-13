const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(400),
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    salt: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    passwordSha: {
      type: Sequelize.STRING(100),
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: 'user base information',
    indexes: [{
      unique: true,
      fields: ['email'],
    }],
    classMethods: {
      add: async function add(user) {

      },
    },
  });
}
