var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


let data = []; // To store user data

router.post('/todo', (req, res) => {
  const { name, todo } = req.body;
  const userIndex = data.findIndex(u => u.name === name);

  if (userIndex >= 0) {
      data[userIndex].todos.push(todo);
      res.send('Todo added');
  } else {
      data.push({ name: name, todos: [todo] });
      res.send('User added');
  }
});

router.get('/user/:id', (req, res) => {
  const name = req.params.id;
  const todo = data.find(u => u.name === name);

  if (todo) {
      res.json(todo);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
  console.log(name,todo);
});

module.exports = router;
