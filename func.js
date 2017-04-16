var data = (localStorage.getItem('mylist')) ? JSON.parse(localStorage.getItem('mylist')):{
  lista: [],
  completado: []
};


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
  data.lista.push(value);
  dataObjectUpdated();
}

function renderizarLista() {
  if (!data.lista.length && !data.completado.length) return;

  for (var i = 0; i < data.lista.length; i++) {
    var value = data.lista[i];
    addItemToDOM(value);
  }

  /*for (var j = 0; j < data.completado.length; j++) {
    var value = data.completado[j];
    addItemToDOM(value, true);
    }*/
}

function dataObjectUpdated() {
  localStorage.setItem('mylist', JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'tarea') {
    data.lista.splice(data.lista.indexOf(value), 1);
  } else {
    data.completado.splice(data.completado.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  var itema = this.parentNode;
  itema.innerText="";//borra el texto de los botones, sino aparece un bug que
                     //el texto de los botones en el campo
  var item = itema.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  if (id === 'tarea') {
    data.lista.splice(data.lista.indexOf(value), 1);
    data.completado.push(value);

  } else {
    data.completado.splice(data.completado.indexOf(value), 1);
    data.lista.push(value);
  }
  dataObjectUpdated();

  // Comprueba si el elemento debe agregarse a la lista de completas o volver a agregarse a la lista de tareas
  var target = (id === 'tarea') ? document.getElementById('tareaCompletada'):document.getElementById('tarea');


  //**add buttons
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = "Delete";

  remove.addEventListener('click', removeItem);

  //var complete = document.createElement('button');
  //complete.classList.add('complete');
  //complete.innerHTML = "Done";


  //complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  //buttons.appendChild(complete);
  item.appendChild(buttons);
  //**
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
  remove.innerHTML = "Delete";

  remove.addEventListener('click', removeItem);

 // var complete = document.createElement('button');
 // complete.classList.add('complete');
 // complete.innerHTML = "Done";


  //complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
 // buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);

}
