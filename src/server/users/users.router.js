var usersController = require('./users.controller.js');


module.exports = function(app){

  app.post('/api/signup', usersController.signup);
};
