const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid/v4');


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
    password: {
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
      add: async function add(userInfo) {
        const salt = await bcrypt.genSalt(10);
        userInfo.password = await bcrypt.hash(userInfo.password, salt);
        userInfo.id = uuidV4();
        const user = this.build(userInfo);
        return await user.save();
      },
      findByEmail: async function findByEmail(email) {
        return await this.find({ where: { email }});
      },
      findByID: async function findByID(id) {
        return await this.find({ where: { id }});
      }
    },
  });
}
