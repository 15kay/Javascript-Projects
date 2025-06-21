const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-idx="${idx}">
            <span>${task.text}</span>
            <button class="remove-btn" data-idx="${idx}">Remove</button>
        `;
        taskList.appendChild(li);
    });
}

addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
};

taskList.onclick = (e) => {
    const idx = e.target.getAttribute('data-idx');
    if (e.target.type === 'checkbox') {
        tasks[idx].completed = e.target.checked;
        saveTasks();
        renderTasks();
    }
    if (e.target.classList.contains('remove-btn')) {
        tasks.splice(idx, 1);
        saveTasks();
        renderTasks();
    }
};

// Initial render
renderTasks();