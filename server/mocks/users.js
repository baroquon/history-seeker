module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.get('/', function(req, res) {
    res.send({
      'users': [
        {id: 1, first_name: 'Brandon', middle_name: 'Everett', last_name: 'Blaylock', date_of_birth: '10/09/1983', role: 'teacher', students: [2, 3]},
        {id: 2, first_name: 'Josh', middle_name: 'Sloan', last_name: 'Adams', date_of_birth: '02/14/1983', role: 'student', teacher: 1},
        {id: 3, first_name: 'Kristen', middle_name: 'Joy', last_name: 'Adams', date_of_birth: '09/17/1982', role: 'student', teacher: 1},
      ]
    });
  });

  usersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id,
        first_name: 'Brandon',
        last_name: 'Blaylock',
        middle_name: 'Everett',
        date_of_birth: '10/09/1983',
        role: 'teacher',
        students: [2, 3],
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
