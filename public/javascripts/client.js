// Example content of public/javascripts/todo.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('todo-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('input-name').value;
        const todo = document.getElementById('input-task').value;

        fetch('/todo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, todo })
        })
        .then(response => response.text())
        .then(data => {
          document.getElementById('response').innerText = data;
        });
    });



});
