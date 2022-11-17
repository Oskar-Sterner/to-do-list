let newSection = document.querySelector('#new');
let newInput = document.querySelector('#newtodo');
let nameEl = document.getElementById('newtodo');
nameEl.addEventListener("keydown", CheckInput)
let todoListField = document.querySelector('#todolist');
let addButton = document.getElementById("newtodobutton");
let clearButton = document.getElementById("clearbutton");
let moveUpButton = document.getElementById("move-up-button");

window.onload = init;
function init(){
  newtodobutton.disabled = true;
}

function CheckInput(){
  let input = nameEl.value;
  
  if(input.length < 4){
    newtodobutton.disabled = true;
    document.getElementById("message").innerHTML = "Du måste ha minst 5 tecken!";
  }
  else{
    newtodobutton.disabled = false;
    document.getElementById("message").innerHTML = " ";
  }
}

let todoList = [];
addButton.addEventListener('click', function(event) {
  event.preventDefault();
  addTodo(newtodo.value);// Kallar addTodo funktionen med inputens box nuletande värde
});

clearButton.addEventListener('click',function(){
  localStorage.clear();
  window.location.reload();
});

function addTodo(objekt) {
  if (objekt !== '') {
    let todo = {
      id: Date.now(),
      name: objekt,
      completed: false
    };
    todoList.push(todo);
    addToLocalStorage(todoList); // Här sparar vi objektet i vårat LocalStorage
    newInput.value = '';
  }
}

function printOut(todoList) {
  todoListField.innerHTML = '';
  todoList.forEach(function(objekt) {
    let checked = objekt.completed ? 'checked': null;

    let li = document.createElement('li');
    li.setAttribute('class', 'objekt');
    li.setAttribute('unikt-id', objekt.id);


  if (objekt.completed === true) {
      li.classList.add('checked');
  }
  li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
      ${objekt.name}<button class="delete-button">X</button> <button class="up">▲</button> <button class="down">▼</button>`;
    todoListField.append(li);
  });
}

function addToLocalStorage(todoList) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  printOut(todoList);
}

function getFromLocalStorage() {
  let reference = localStorage.getItem('todoList');
  if (reference) {
    todoList = JSON.parse(reference);
    printOut(todoList);
  }
}

function toggle(id) {
  todoList.forEach(function(objekt) {
    if (objekt.id == id) {
      objekt.completed = !objekt.completed;
    }
  });
addToLocalStorage(todoList);
}

function deleteTodo(id) {
  todoList = todoList.filter(function(objekt) {
    return objekt.id != id;
  });
  addToLocalStorage(todoList);
}

getFromLocalStorage();
todoListField.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('unikt-id'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('unikt-id'));
  }
});
console.log(todoList);