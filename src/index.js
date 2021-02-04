// tidy up code
// consider adding firebase support

function getTodaysDate() {
const field = document.querySelector('#addTodoDate');
const date = new Date();
// Set the date
field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
}

function reformatDate(date) {
  const year = date.slice(0, 4);
  console.log(year);
  const month = date.slice(5, 7);
  console.log(month);
  const day = date.slice(8, 10);
  console.log(day);
  const newDate = `${day}-${month}-${year}`;
  console.log(newDate);
  return newDate;
}



class Todo {
  constructor (title, project, description, dueDate) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }
  addTodoToProject() {
    activeProject.todos.push(this);
  }
}

class Project {
  constructor (title, todos = []) {
    this.title = title;
    this.todos = todos;
  }

  addProjectToList() {
    projects.push(this);
    displayProjects();
  }



  displayTodos() {
    // MAKE THE CLICKED PROJECT THE ACTIVE PROJECT
    // (for the benefit of the addTodo function - so it knows where to save new todo)
    activeProject = this;
    const projectTitleDisplay = document.getElementById("project-title");
    projectTitleDisplay.innerHTML = activeProject.title;

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
    col4.classList.add("dueDateColumn");
    col4.innerHTML = "Due Date";
    topRow.appendChild(col4);
    // lopp through corresponding Todo todos and build a grid item for each one
    for (let i = 0; i < activeProject.todos.length; i++) {
      
      const todoItem = document.createElement("div");
      todoItem.classList.add("row", "todo-item");
      container.appendChild(todoItem);
  
      const checkboxColumn = document.createElement("div");
      checkboxColumn.classList.add("col-1", "center");
      todoItem.appendChild(checkboxColumn);
  
      const checkboxImage = document.createElement("img");
      checkboxImage.classList.add("checkbox");
      checkboxImage.id = i;
      if (activeProject.todos[i].completed) {
        checkboxImage.src = "images/checkbox.svg";
        checkboxImage.alt = "checked";
        todoItem.style.opacity = 0.5;
      } else {
        checkboxImage.src = "images/blank-check-box.svg";
        checkboxImage.alt = "unchecked";
      }
      checkboxImage.addEventListener("click", function() {
        if (activeProject.todos[i].completed) {
          activeProject.todos[i].completed = false;
        } else {
          activeProject.todos[i].completed = true;
        }
        activeProject.displayTodos();
      })
      checkboxColumn.appendChild(checkboxImage);
  
      const todoTitle = document.createElement("div");
      todoTitle.classList.add("col-7", "col-text");
      todoTitle.innerHTML = activeProject.todos[i].title;
      if (activeProject.todos[i].completed) {
        todoTitle.style.textDecoration = "line-through";
      }
      todoTitle.addEventListener("click", () => this.editTodo(i));
      todoItem.appendChild(todoTitle);
  
      const todoDate = document.createElement("div");
      todoDate.classList.add("col-2", "col-text");
      todoDate.innerHTML = reformatDate(activeProject.todos[i].dueDate);
      todoItem.appendChild(todoDate);
  
      const editColumn = document.createElement("div");
      editColumn.classList.add("col-1", "col-text");
      todoItem.appendChild(editColumn);
  
      const editBtn = document.createElement("img");
      editBtn.classList.add("edit");
      editBtn.src = "images/edit.svg";
      editBtn.alt = "edit";
      editBtn.id = i;
      editBtn.addEventListener("click", () => this.editTodo(i))
      editColumn.appendChild(editBtn);
  
      const deleteColumn = document.createElement("div");
      deleteColumn.classList.add("col-1");
      todoItem.appendChild(deleteColumn);
  
      const deleteBtn = document.createElement("img");
      deleteBtn.classList.add("trash");
      deleteBtn.src = "images/trash-can.svg";
      deleteBtn.alt = "delete";
      deleteBtn.id = i;
      deleteBtn.addEventListener("click", (e) => deleteTodo(e));
      deleteColumn.appendChild(deleteBtn);
    }
  }

  editTodo(i) {
      // generate a new edit modal, which contains the relevant info
      const editTodoModal = document.createElement("div");
      editTodoModal.classList.add("modal");
      editTodoModal.style.display = "block";

      const editTodoModalContent = document.createElement("editTodoModalContent");
      editTodoModalContent.classList.add("modal-content");
      editTodoModal.appendChild(editTodoModalContent);

      const customFlex = document.createElement("div");
      customFlex.classList.add("custom-flex");
      editTodoModalContent.appendChild(customFlex);

      const editTodoModalTitle = document.createElement("h2");
      editTodoModalTitle.innerHTML = "Edit Todo";
      customFlex.appendChild(editTodoModalTitle);

      const editTodoModalClose = document.createElement("span");
      editTodoModalClose.classList.add("close");
      editTodoModalClose.innerHTML = "&times;";
      function closeEditModal() {
        editTodoModal.style.display = "none";
        console.log("fired");
      }
      editTodoModalClose.addEventListener("click", () => closeEditModal());
      customFlex.appendChild(editTodoModalClose);

      const form = document.createElement("form");
      editTodoModalContent.appendChild(form);

      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title");
      titleLabel.innerHTML = "Task Name:";
      form.appendChild(titleLabel);

      const br = document.createElement("br");
      form.appendChild(br);

      const editTodoTitleInput = document.createElement("input");
      editTodoTitleInput.setAttribute("type", "text");
      editTodoTitleInput.id = "editTodoTitle";
      editTodoTitleInput.setAttribute("name", "title");
      editTodoTitleInput.value = activeProject.todos[i].title;
      form.appendChild(editTodoTitleInput);
      form.appendChild(br);

      const descriptionLabel = document.createElement("label");
      descriptionLabel.setAttribute("for", "description");
      descriptionLabel.innerHTML = "Description:";
      form.appendChild(descriptionLabel);
      form.appendChild(br);

      const editDescriptionInput = document.createElement("textarea");
      editDescriptionInput.setAttribute("type", "text");
      editDescriptionInput.id = "editTodoDescription";
      editDescriptionInput.setAttribute("name", "title");
      editDescriptionInput.setAttribute("rows", "4");
      editDescriptionInput.value = activeProject.todos[i].description;
      form.appendChild(editDescriptionInput);
      form.appendChild(br);

      const dateLabel = document.createElement("label");
      dateLabel.setAttribute("for", "date");
      dateLabel.innerHTML = "Date:";
      form.appendChild(dateLabel);

      form.appendChild(br);

      const editTodoDateInput = document.createElement("input");
      editTodoDateInput.setAttribute("type", "date");
      editTodoDateInput.id = "editTodoDate";
      editTodoDateInput.setAttribute("name", "date");
      editTodoDateInput.classList.add("todoDateInput");
      editTodoDateInput.value = activeProject.todos[i].dueDate;
      form.appendChild(editTodoDateInput);
      form.appendChild(br);
      
      const editTodoSaveButton = document.createElement("button");
      editTodoSaveButton.setAttribute("type", "button");
      editTodoSaveButton.id = "editTodoSave";
      editTodoSaveButton.innerHTML = "Save";
      editTodoSaveButton.addEventListener("click", function() {
        if (editTodoTitleInput.value === "") {
            alertNoTitleInput(editTodoTitleInput);
        } else {
        activeProject.todos[i].title = editTodoTitleInput.value;
        activeProject.todos[i].description = editDescriptionInput.value;
        activeProject.todos[i].dueDate = editTodoDateInput.value;
        closeEditModal()
        activeProject.displayTodos();
        }
      })
      form.appendChild(editTodoSaveButton);

      const modalAppend = document.getElementById("modalAppend");
      modalAppend.appendChild(editTodoModal);
      updateLocalStorage();

      // When the user clicks anywhere outside of the modal, close it
      window.addEventListener("click", function(event) {
        if (event.target == editTodoModal) {
        editTodoModal.style.display = "none";
        }
      });
    } // ---- / editTodo function ----- //
  }

  function reviveJSON() {
    for (let i = 0; i < projects.length; i++) {
      projects[i] = new Project(projects[i].title, projects[i].todos)
    }
    return projects;
  }

// ------ INITIAL SETUP OF DEFAULTS ------ //
const projectsList = document.getElementById("projects-list");

let projects = [];

let activeProject = "";

// retrieve projects from local storage on startup
function retrieveProjects() {
  if (localStorage.projects) {
    projects = JSON.parse(localStorage.projects);
    projects = reviveJSON();
    displayProjects();
    if (projects[0]) {
      activeProject = projects[0];
      activeProject.displayTodos();
    } else {
      toggleAddTodoBtn();
    }
  } else {
    const defaultProject = new Project("Default Project");
    activeProject = defaultProject;
    const defaultTodo = new Todo("Eat chicken", defaultProject.title, "go back", "11/02/1993");
    defaultTodo.addTodoToProject();
    defaultProject.addProjectToList();
    defaultProject.displayTodos();
  }
}

retrieveProjects();


// update local storage when a change is made
function updateLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
  
// ------ ADD PROJECT MODAL ------ //
    // Get the modal
const projectsModal = document.getElementById("projectsModal");

// Get the button that opens the modal
const projectBtn = document.getElementById("add-project");

// Get the <span> element that closes the modal
const projectClose = document.getElementById("projectModalClose");

// When the user clicks on the button, open the modal
projectBtn.addEventListener("click", function() {  
  projectsModal.style.display = "block";});

// When the user clicks on <span> (x), close the modal
projectClose.onclick = function() {
  projectsModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == projectsModal) {
    projectsModal.style.display = "none";
  }
});

// Get the user input for project title
const projectTitle = document.getElementById("projectTitle");

function createNewProject(name) {
  if (projectTitle.value === "") {
    alertNoTitleInput(projectTitle);
  } else {
  const newProject = new Project(name);
    // TEMPORARY TEST TODOS ADDED
    newProject.todos.push(new Todo("log in", "Work", "log on to PC", "2021-02-02"))
    newProject.todos.push(new Todo("rama", "krishna", "log on to PC", "2021-02-02"))
    newProject.addProjectToList();
    newProject.displayTodos();
    closeProjectsModal();
    toggleAddTodoBtn();
  }
}

// When user clicks save, add project to projects list
const projectSaveBtn = document.getElementById("projectSave");
projectSaveBtn.addEventListener("click", () => createNewProject(projectTitle.value));

function closeProjectsModal() {
  projectsModal.style.display = "none";
}

// -------- END ADD PROJECTS MODAL ------- //

// DISPLAY THE PROJECTS
function displayProjects() {
  projectsList.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    console.log(projects);
    console.log(projects[i]);
    const newProjectDiv = document.createElement("div");
    const newProjectTitle = document.createElement("h4");
    newProjectTitle.classList.add("projectTitle")
    newProjectTitle.id = i;
    newProjectTitle.innerHTML = projects[i].title;
    newProjectDiv.appendChild(newProjectTitle);
    const projectDeleteBtn = document.createElement("img");
    projectDeleteBtn.src = "images/trash-can.svg";
    projectDeleteBtn.classList.add("trash");
    projectDeleteBtn.classList.add("hoverAppear");
    projectDeleteBtn.style.opacity = 0;
    
    projectDeleteBtn.addEventListener("click", () => deleteProject(i));
    newProjectDiv.classList.add("project-flex");
    newProjectDiv.addEventListener("mouseover", function() {
      projectDeleteBtn.style.opacity = 0.5});
    newProjectDiv.addEventListener("mouseout", function() {
      projectDeleteBtn.style.opacity = 0;
    });
    newProjectDiv.appendChild(projectDeleteBtn);
    
    newProjectTitle.addEventListener("click", () => projects[i].displayTodos());
    projectsList.appendChild(newProjectDiv);
  }
  updateLocalStorage();
}

function deleteProject(i) {
  // remove the selected project
  projects.splice(i, 1);
  // 3 possible scenarios on deletion - skip to project before, skip to one after, display blank if no projects left
  if (projects[i-1]) {
    activeProject = projects[i - 1];
    activeProject.displayTodos();
  } else if (projects[i]) {
    activeProject = projects[i];
    activeProject.displayTodos();
  } else {
    activeProject = "";
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    const projectTitleDisplay = document.getElementById("project-title");
    projectTitleDisplay.innerHTML = "Todos";    
  }
  // remove the option to add todos if there are no projects
  toggleAddTodoBtn();
  // display the projects (or lackthereof)
  displayProjects();
}


function deleteTodo(e) {
activeProject.todos.splice(e.target.id, 1);
activeProject.displayTodos();
updateLocalStorage();
}


function toggleAddTodoBtn() {
  const addTodoButton = document.getElementById("add-todo");
  if (projects.length === 0) {
  addTodoButton.style.display = "none";
  } else {
  addTodoButton.style.display = "block";
  }
}


// ------ EDIT TODO MODAL ------ //
    // Get the modal
    const editTodoModal = document.getElementById("editTodoModal");
    
    // Get the <span> element that closes the modal
    const editTodoModalClose = document.getElementById("editTodoModalClose");

    function openEditModal() {
      editTodoModal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    function closeEditModal() {
      editTodoModal.style.display = "none";
      console.log("fired");
    }
    editTodoModalClose.onclick = () => closeEditModal();
    
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function(event) {
      if (event.target == editTodoModal) {
        editTodoModal.style.display = "none";
      }
    });



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



// CREATE A NEW TODO FROM USER INPUT AND REDISPLAY ALL TODOS
function createTodo() {
  // get user input value boxes
  let todoTitle = document.getElementById("addTodoTitle");
  let todoDesc = document.getElementById("addTodoDescription");
  let todoDate = document.getElementById("addTodoDate");
  // create new todo with user input
  // todoDate.value = format(new Date(2021, 01, 31), 'dd/MM/yyy');
  if (todoTitle.value === "") {
    alertNoTitleInput(todoTitle);
  } else {
  const newTodo = new Todo (todoTitle.value, activeProject.title, todoDesc.value, todoDate.value);
  console.log(newTodo);
  // save new todo into the active project
  newTodo.addTodoToProject();
  activeProject.displayTodos();
  closeTodoModal();
  updateLocalStorage();
  }
}

function alertNoTitleInput(input) {
  input.placeholder = "You must enter a title.";
}


// ----- THE ADD TODO MODAL ----- //
  // Get the modal
var todoModal = document.getElementById("addTodoModal");

// Get the button that opens the modal
var btn = document.getElementById("add-todo");

// Get the <span> element that closes the modal
var span = document.getElementById("modalClose");

// When the user clicks on the button, open the modal
function openTodoModal() {
  todoModal.style.display = "block";
  // set default date input to today
  getTodaysDate();
}
btn.onclick = () => openTodoModal();

// When the user clicks on <span> (x), close the modal
span.onclick = () => closeTodoModal();

function closeTodoModal() {
  todoModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == todoModal) {
    todoModal.style.display = "none";
  }
});

// get todo save button
const todoSaveBtn = document.getElementById("addTodoSave");
// create new todo from user input when button clicked
todoSaveBtn.addEventListener("click", () => createTodo());

