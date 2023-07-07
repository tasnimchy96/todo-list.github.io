import './style.css';
import createNewTask from './modules/createNewTask.js';
import removeTask from './modules/removeTask.js';
import updateTask from './modules/updateTask.js';

const todoForm = document.querySelector('#add-task');
const todoList = document.querySelector('#task-list');
const taskInput = document.querySelector('#add-task input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

todoList.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    event.target.blur();
  }
});

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = taskInput.value;

  if (inputValue === '') {
    return;
  }

  const task = {
    index: tasks.length + 1,
    name: inputValue,
    completed: false,
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const newTaskElement = createNewTask(task);
  todoList.appendChild(newTaskElement);

  todoForm.reset();
  taskInput.focus();
});

if (localStorage.getItem('tasks')) {
  tasks.map((task) => {
    const newTaskElement = createNewTask(task);
    todoList.appendChild(newTaskElement);
    return null;
  });
}

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const taskIndex = event.target.closest('li').id;
    tasks = removeTask(taskIndex, tasks);
  }
});

todoList.addEventListener('input', (event) => {
  const taskIndex = event.target.closest('li').id;
  tasks = updateTask(taskIndex, event.target, tasks);
});
