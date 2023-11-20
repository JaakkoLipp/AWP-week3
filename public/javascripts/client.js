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


    
    // Event listener for the search button
    document.getElementById('search').addEventListener('click', function() {
        const name = document.getElementById('search-name').value;

        fetch(`/user/${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(todo => {
                const searchResponse = document.getElementById('search-response');
                // Clear previous search results
                searchResponse.innerHTML = '';

                // Display the name
                const nameElement = document.createElement('h3');
                nameElement.textContent = todo.name;
                searchResponse.appendChild(nameElement);

                // Check if todos are available
                if (todo.todos && todo.todos.length) {
                    // Create a list to display todos
                    const ul = document.createElement('ul');
                    todo.todos.forEach(task => {
                        const li = document.createElement('li');
                        li.textContent = task;
                        ul.appendChild(li);
                    });
                    searchResponse.appendChild(ul);
                } else {
                    const noTodosText = document.createElement('p');
                    noTodosText.textContent = 'No todos for this user';
                    searchResponse.appendChild(noTodosText);
                }
            })
            .catch(error => {
                document.getElementById('search-response').innerText = error.message;
            });
    });

});
