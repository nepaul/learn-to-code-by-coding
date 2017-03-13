const path = require('path');


module.exports = {
  port: process.env.PORT || 3000,
  APIPrefix: '/api/v1',
  secret: 'jwt-vue-secret',
  expiresIn: 30 * 24 * 60 * 60,
  DB: {
    db: 'jwtvue',
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
