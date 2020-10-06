const userController = require('../controller/user');

exports.register = (router) => {
  router
    .get('/users', userController.showUser)
    .post('/users', userController.createUser)
    .get('/players/:playerID', userController.showPlayer)
    .post('/players', userController.createPlayer);
};
