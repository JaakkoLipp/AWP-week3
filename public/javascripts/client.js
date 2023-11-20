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
            .then(response => response.json()) // Parse the response as JSON
            .then(todo => {
                const searchResponse = document.getElementById('search-response');
                // Clear previous search results
                searchResponse.innerHTML = '';

                // Check if user has any todos
                if (todo.todos && todo.todos.length) {
                    // Create a list to display todos
                    const ul = document.createElement('ul');
                    todo.todos.forEach(todo => {
                        const li = document.createElement('li');
                        li.textContent = todo;
                        ul.appendChild(li);
                    });
                    searchResponse.appendChild(ul);
                } else {
                    searchResponse.innerText = 'No todos for this user';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('search-response').innerText = 'User not found';
            });
    });


});
