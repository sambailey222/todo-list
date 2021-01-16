// title, description, dueDate, notes
// objects to be stored within a project.
// project going to be an array comprised of objects (the todos)

// start out by creating a basic user interface that allows you to add todos and store them in an array

class Todo {
  constructor (title, project, description, dueDate) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    // this.notes = notes;
  }
}

class Project {
  constructor (title) {
    this.title = title;
    this.todos = [];
    this.active = false;
  }
}


// const work = new Project("Work");
// console.log(work);

// const TodoWork1 = new Todo("log in", "Work");
// console.log(TodoWork1);

// work.todos.push(TodoWork1);
// console.log(work.todos);
// console.log(work);

const projectBtn = document.getElementById("add-project");
const projectsList = document.getElementById("projects-list");

const projects = [];
// // projects.push(work);
// console.log(projects);


function addProject(name) {
  const newProject = new Project(name);
  // TEMPORARY TEST TODO ADDED
  newProject.todos.push(new Todo("log in", "Work", "log on to PC", "14/01/2021"))
  newProject.todos.push(new Todo("rama", "krishna", "log on to PC", "14/01/2021"))
  projects.push(newProject);
  this.displayProjects();
}

let activeProject = "";

function displayProjects() {
  projectsList.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const newProjectTitle = document.createElement("h3");
    newProjectTitle.id = i;
    newProjectTitle.innerHTML = projects[i].title;
    console.log(projects[i]);
    newProjectTitle.addEventListener("click", () => displayTodos(projects[i]));
    projectsList.appendChild(newProjectTitle);
  }
}

function displayTodos(project) {
  // change the value of each project's active property so only clicked project is active
  // may be possible to improve/avoid this loop by just replacing the tab? think about this later
  // for (let i = 0; i < projects.length; i++) {
  //   projects[i].active = (i === parseInt(e.target.id));
  //   console.log(projects[i].active);
  // }

  activeProject = project;
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  
  // build top row with "due date" column
  const container = document.createElement("div");
  container.classList.add("container");
  todoList.appendChild(container);

  const topRow = document.createElement("div");
  topRow.classList.add("row");
  container.appendChild(topRow);

  const col8 = document.createElement("div");
  col8.classList.add("col-8");
  topRow.appendChild(col8);

  const col4 = document.createElement("div");
  col4.classList.add("col-4");
  col4.innerHTML = "Due Date";
  topRow.appendChild(col4);
  // lopp through corresponding Todo todos and build a grid item for each one
  for (let i = 0; i < project.todos.length; i++) {
    
    const todoItem = document.createElement("div");
    todoItem.classList.add("row", "todo-item");
    container.appendChild(todoItem);

    const checkboxColumn = document.createElement("div");
    checkboxColumn.classList.add("col-1", "center");
    todoItem.appendChild(checkboxColumn);

    const checkboxImage = document.createElement("img");
    checkboxImage.classList.add("checkbox");
    checkboxImage.src = "images/blank-check-box.svg";
    checkboxImage.alt = "check";
    checkboxColumn.appendChild(checkboxImage);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("col-7", "col-text");
    todoTitle.innerHTML = project.todos[i].title;
    todoItem.appendChild(todoTitle);

    const todoDate = document.createElement("div");
    todoDate.classList.add("col-2", "col-text");
    todoDate.innerHTML = project.todos[i].dueDate;
    todoItem.appendChild(todoDate);

    const editColumn = document.createElement("div");
    editColumn.classList.add("col-1", "col-text");
    todoItem.appendChild(editColumn);

    const editBtn = document.createElement("img");
    editBtn.classList.add("edit");
    editBtn.src = "images/edit.svg";
    editBtn.alt = "edit";
    editColumn.appendChild(editBtn);

    const deleteColumn = document.createElement("div");
    deleteColumn.classList.add("col-1");
    todoItem.appendChild(deleteColumn);

    const deleteBtn = document.createElement("img");
    deleteBtn.classList.add("trash");
    deleteBtn.src = "images/trash-can.svg";
    deleteBtn.alt = "delete";
    deleteColumn.appendChild(deleteBtn);
  }
}

projectBtn.addEventListener("click", () => addProject("Work"));


// when I push the new project button, 
  // a new project object should be created with desired name, 
  // the new project object should be pushed to the projects array,
  // the new project should be listed on the left hand menu
  // the right hand menu should change to a new "tab"
  // the tab should list all the todos saved in that project

// when I click on a project name
  // all other projects' active property should be set to "false"
  // the project's active status should be changed to "true"
  // the right hand menu should change to a new "tab"
  // that tab should display all of the todos stored in the active project's todos list.

// when I click on the Add Todo button within a project
  // a modal window should pop up
  // within that modal window I should be able to add the name, dueDate, notes relating to a Todo
  // there should be a save button and a close button
  // when I click save, the todo should be stored in the relevant array and displayed to the page
  // if I fail to add a title before clicking save, I should be alerted that I cannot save before adding one.


// first write a function that simply logs the input values when you press save
// think bootstrap is fucking with this process and clearing the console.
// may need to change class names to get away from bootstrap??
let title = "";
let desc = "";
let date = "";


// need to know which project to save it to (activeProject)
// need to take the information stored in the form and create a new Todo with it
// the  push that todo to the project todos array
// then display the todos again
function createTodo() {
  let todoTitle = document.getElementById("title");
  let todoDesc = document.getElementById("description");
  let todoDate = document.getElementById("date");
  // title = todoTitle.value;
  // desc = todoDesc.value;
  // date = todoDate.value;
  const newTodo = new Todo (todoTitle.value, activeProject.title, todoDesc.value, todoDate.value);
  console.log(newTodo);
  activeProject.todos.push(newTodo);
  displayTodos(activeProject);
}

const saveBTN = document.getElementById("save");

saveBTN.addEventListener("click", () => createTodo());
 
// need function that sets the global active project when you click on a project name




  // Get the modal
var modal = document.getElementById("todoModal");

// Get the button that opens the modal
var btn = document.getElementById("add-todo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}