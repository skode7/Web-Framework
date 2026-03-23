// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

const ul = document.querySelector('ul');

for (const todo of todoList) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  const li = document.createElement('li');

  input.id = 'todo-' + todo.id;
  input.type = 'checkbox';
  input.addEventListener('click', event => {
    todo.completed = !todo.completed;
    console.log(
      'Clicked ' + todo.task + ', completed is now: ' + todo.completed
    );
  });

  if (todo.completed) {
    input.checked = true;
  }

  label.textContent = todo.task;
  label.htmlFor = 'todo-' + todo.id;

  li.append(input, label);
  ul.appendChild(li);
}
