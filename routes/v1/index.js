var express = require('express');
var routes = express.Router();

const users = require('./users')

routes.get('/', function (req, res, next) {
  res.render('index', { title: 'Node JS', description: 'Welcome to Node JS!!!' });
});

routes.use('/users', users)

module.exports = routes;
