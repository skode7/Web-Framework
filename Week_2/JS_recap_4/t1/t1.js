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

// Näyttää todo-listan käyttäjälle
// Lisää kuuntelijat checkboxeihin
function showTodoList() {
  for (const todo of todoList) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const li = document.createElement('li');

    li.className = 'listItem';
    li.dataset.id = todo.id;

    input.id = todo.id;
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
    label.htmlFor = todo.id;

    li.append(input, label);
    ul.appendChild(li);
  }
  addDeleteButton();
}

// Lisää delete nappi ja sen toiminnallisuus
function addDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'add-btn';
  deleteButton.textContent = 'Delete item';

  document.body.append(deleteButton);

  deleteButton.addEventListener('click', event => {
    let checked = document.querySelectorAll(
      'li:has(>input[type=checkbox]:checked)'
    );

    checked.forEach(node => {
      const datasetId = Number(node.dataset.id);
      const index = todoList.findIndex(item => {
        return item.id === datasetId;
      });

      todoList.splice(index, 1);
      ul.removeChild(node);
    });

    console.log('päivitetty lista', todoList);
  });
}

showTodoList();
