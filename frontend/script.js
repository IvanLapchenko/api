document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const regForm = document.getElementById('reg-form');
    const regInput = document.getElementById('reg-input');
    console.log(getCookie('token'))

    function testToken() {
        fetch('http://localhost:5000/dummy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: getCookie('token') })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
    testToken()
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

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
        const newTask = regInput.value;

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


    regForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUser = regInput.value;

        if (newUser) {
            fetch('http://localhost:5000/reg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newUser })
            })
            .then(response => response.json())
            .then(data => {
                console.log(1111)
                let token = data['token']
                document.cookie = 'token=' + token;
            })
        }
    });
});
