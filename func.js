var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};
borrar = "delete";
completo = "complete";

renderizarLista();

document.getElementById('intro').addEventListener('click', function() {
  var value = document.getElementById('entrada').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('entrada').addEventListener('keydown', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

function addItem (value) {
  addItemToDOM(value);
  document.getElementById('entrada').value = '';

  data.todo.push(value);
  dataObjectUpdated();
}

function renderizarLista() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'tarea') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'tarea') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Comprueba si el elemento debe agregarse a la lista de completas o volver a agregarse a la lista de tareas
  var target = (id === 'tarea') ? document.getElementById('tareaCompletada'):document.getElementById('tarea');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Añade un nuevo elemento a la lista de tareas
function addItemToDOM(text, completed) {
  var list = (completed) ? document.getElementById('tareaCompletada'):document.getElementById('tarea');

  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = borrar;

  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completo;


  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}
