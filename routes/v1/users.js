var express = require('express');
var routes = express.Router();
const UserController = require('../../controllers/UserController');

routes.get('/', UserController.getAllUsers);
routes.get('/:id', UserController.getUserById);
routes.post('/', UserController.createUser);
routes.put('/:id', UserController.updateUser);
routes.delete('/:id', UserController.deleteUser);

module.exports = routes;
