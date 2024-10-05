window.onload = function() {
    const tasksList = document.getElementById('tasks__list');
    const taskInput = document.getElementById('task__input');
    const tasksForm = document.getElementById('tasks__form');

    // Получаем сохраненные задачи из localStorage при загрузке страницы
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');
            taskItem.innerHTML = `
                <div class="task__title">${task}</div>
                <a href="#" class="task__remove" onclick="removeTask(${index})">&times;</a>
            `;
            tasksList.appendChild(taskItem);
        });
    }

    renderTasks();

    tasksForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (taskInput.value.trim() === '') return;
        
        tasks.push(taskInput.value.trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    });

    window.removeTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };
};