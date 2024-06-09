document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  // Retrieve tasks from storage
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach((task) => {
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    taskSpan.className = 'task';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Done';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(listItem);
      removeTaskFromStorage(task.text);
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });

  addTaskBtn.addEventListener('click', addTask);
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
      const task = { text: taskText };
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      storedTasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));

      const listItem = document.createElement('li');

      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
      taskSpan.className = 'task';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Done';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        removeTaskFromStorage(taskText);
      });

      listItem.appendChild(taskSpan);
      listItem.appendChild(deleteBtn);
      taskList.appendChild(listItem);

      newTaskInput.value = '';
      newTaskInput.focus();
    }
  }

  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = storedTasks.findIndex((task) => task.text === taskText);
    if (index !== -1) {
      storedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }
});