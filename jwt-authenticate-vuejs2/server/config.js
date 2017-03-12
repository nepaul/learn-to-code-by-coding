const path = require('path');


module.exports = {
  port: process.env.PORT || 3000,
  APIPrefix: '/api/v1',
  DB: {
    db: 'jwtVue2',
    user: 'root',
    password: '',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      // SQLite only
      // storage: path.normalize(`${__dirname}/sqlite.db`),
      define: {
        timestamps: true,
        charset: 'utf8',
      },
    },
  }

}
