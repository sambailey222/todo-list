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
    this.items = [];
    this.active = false;
  }
}


// const work = new Project("Work");
// console.log(work);

// const TodoWork1 = new Todo("log in", "Work");
// console.log(TodoWork1);

// work.items.push(TodoWork1);
// console.log(work.items);
// console.log(work);

const projectBtn = document.getElementById("add-project");
const projectsList = document.getElementById("projects-list");

const projects = [];
// // projects.push(work);
// console.log(projects);


function addProject(name) {
  const newProject = new Project(name);
  // TEMPORARY TEST TODO ADDED
  newProject.items.push(new Todo("log in", "Work", "log on to PC", "14/01/2021"))
  projects.push(newProject);
  this.displayProjects();
}

function displayProjects() {
  projectsList.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const newProjectTitle = document.createElement("h3");
    newProjectTitle.id = i;
    newProjectTitle.innerHTML = projects[i].title;
    console.log(projects[i]);
    newProjectTitle.addEventListener("click", (e) => displayTodos(e, projects[i]));
    projectsList.appendChild(newProjectTitle);
  }
}

function displayTodos(e, project) {
  // change the value of each project's active property so only clicked project is active
  // may be possible to improve/avoid this loop by just replacing the tab? think about this later
  for (let i = 0; i < projects.length; i++) {
    projects[i].active = (i === parseInt(e.target.id));
    console.log(projects[i].active);
  }
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  // lopp through corresponding Todo items and build a grid item for each one
  for (let i = 0; i < project.items.length; i++) {
    console.log(project.items);
    console.log(project.items.length);
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
    // BEGIN ACTUAL TODO DISPLAY
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
    todoTitle.innerHTML = project.items[i].title;
    todoItem.appendChild(todoTitle);

    const todoDate = document.createElement("div");
    todoDate.classList.add("col-2", "col-text");
    todoDate.innerHTML = project.items[i].date;
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
  // that tab should display all of the todos stored in the active project's items list.


