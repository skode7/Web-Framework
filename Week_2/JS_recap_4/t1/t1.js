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
    const checkboxInput = document.createElement('input');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    li.className = 'listItem';
    li.dataset.id = todo.id;
    li.appendChild(deleteBtn);

    deleteBtn.textContent = 'delete';

    checkboxInput.id = todo.id;
    checkboxInput.type = 'checkbox';
    checkboxInput.addEventListener('click', event => {
      todo.completed = !todo.completed;
      console.log(
        'Clicked ' + todo.task + ', completed is now: ' + todo.completed
      );
    });

    if (todo.completed) {
      checkboxInput.checked = true;
    }

    label.textContent = todo.task;
    label.htmlFor = todo.id;

    li.append(label, checkboxInput);
    ul.appendChild(li);

    addListenerToAddTodoItemButton();
    addListenerToDeleteButton(deleteBtn);
  }
  addListenerToAddButton();
}
/*
  const deleteButton = document.createElement('button');
  deleteButton.className = 'add-btn';
  deleteButton.textContent = 'Delete item';

  document.body.append(deleteButton);

  deleteButton.addEventListener('click', event => {
    let checked = document.querySelectorAll(
      'li:has(>checkboxInput[type=checkbox]:checked)'
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
} */

// Lisätään kuuntelija delete napille
function addListenerToDeleteButton(button) {
  button.addEventListener('click', event => {
    const id = event.target.parentElement.dataset.id;
    ul.removeChild(event.target.parentElement);

    const indexToRemove = todoList.findIndex(item => {
      return item.id === Number(id);
    });

    todoList.splice(indexToRemove, 1);

    console.log('updated array: ', todoList);
  });
}

// Lisätään toiminnallisuus addTodoItem buttonille
function addListenerToAddTodoItemButton() {
  const addButton = document.querySelector('button.add-btn');
  const dialog = document.querySelector('dialog');
  addButton.addEventListener('click', event => {
    dialog.showModal();
  });
}

function addListenerToAddButton() {
  const addBtn = document.querySelector('form > button');
  let newTodoItemValue;
  addBtn.addEventListener('click', event => {
    newTodoItemValue = document.querySelector('form > input');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const id = Date.now();
    const li = document.createElement('li');
    const deletetBtn = document.createElement('button');

    if (newTodoItemValue.value) {
      todoList.push({
        id: id,
        task: newTodoItemValue.value,
        completed: false,
      });
      console.log('updated list: ', todoList);
      deletetBtn.textContent = 'delete';
      label.textContent = newTodoItemValue.value;
      label.htmlFor = id;

      input.type = 'checkbox';
      input.id = id;

      li.append(input, label, deletetBtn);
      ul.append(li);
      addListenerToDeleteButton(deletetBtn);
      newTodoItemValue.value = '';
    }
    document.querySelector('dialog').close();
  });
}

showTodoList();
