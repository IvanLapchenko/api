document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    fetch('http://localhost:5000/tasks')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.title;
                taskList.appendChild(li);
            });
        });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTask = taskInput.value;

        if (newTask) {
            fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTask })
            })
            .then(response => response.json())
            .then(data => {
                const li = document.createElement('li');
                li.textContent = newTask;
                taskList.appendChild(li);
                taskInput.value = '';
            });
        }
    });
});
