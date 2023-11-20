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


module.exports = router;
