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

router.delete('/user/:id', (req, res) => {
  const name = req.params.id;
  const index = data.findIndex(u => u.name === name);

  if (index > -1) {
      data.splice(index, 1); // Remove the user from the array
      res.send('User deleted');
  } else {
      res.status(404).send('User not found');
  }
});

router.put('/user', (req, res) => {
  const { name, index } = req.body; // Destructure the name and index from the request body
  const user = data.find(u => u.name === name);

  if (user && user.todos && index >= 0 && index < user.todos.length) {
      user.todos.splice(index, 1); // Remove the todo at the specified index
      res.send('Task deleted');
  } else {
      res.status(404).send('User not found');
  }
});

module.exports = router;
