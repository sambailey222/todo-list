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
      todoDate.innerHTML = activeProject.todos[i].dueDate;
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
      editTodoDateInput.setAttribute("type", "text");
      editTodoDateInput.id = "editTodoDate";
      editTodoDateInput.setAttribute("name", "date");
      editTodoDateInput.value = activeProject.todos[i].dueDate;
      form.appendChild(editTodoDateInput);
      form.appendChild(br);

      const editTodoSaveButton = document.createElement("button");
      editTodoSaveButton.setAttribute("type", "button");
      editTodoSaveButton.id = "editTodoSave";
      editTodoSaveButton.innerHTML = "Save";
      editTodoSaveButton.addEventListener("click", function() {
        console.log(i);
        console.log(editTodoTitleInput.value)
        activeProject.todos[i].title = editTodoTitleInput.value;
        console.log(editDescriptionInput.value);
        activeProject.todos[i].description = editDescriptionInput.value;
        console.log(editTodoDateInput.value);
        activeProject.todos[i].dueDate = editTodoDateInput.value;
        closeEditModal()
        activeProject.displayTodos();
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
    }
  }

  function reviveJSON() {
    for (let i = 0; i < projects.length; i++) {
      console.log(projects[i]);
      console.log(projects[i].title);
      console.log(projects[i].todos);
      
      projects[i] = new Project(projects[i].title, projects[i].todos)
      console.log(projects[i]);
      
    }
    
    return projects;
  }



  // is there any benefit to using class methods here? 
  // Still going to need an external function that creates the new class and then accesses its methods. 
  // May as well have one external function that does it all?
  // May be more elegant design to have the methods though
  // a method should surely be something that is done to the individual object, rather than all of them.
  // here is where functionality should be stored:
  // add to projects list - within project DONE
  // remove project - either within or without project
  // add todo to project- within todo DONE
  // edit todo - within todo
  // delete - either within or without
  // toggle check (complete) todo - within todo (possibly as a property of the object?)
  // if decide against, will need to take addProject back out (or restore from last push);


  // THINGS THAT STILL NEED TO BE DONE
  
  // sort out CSS
  // watch local storage thing on treehouse
  // add date picker function
  // add local storage
  // add firebase backend
  // refactor code into modules

// ------ INITIAL SETUP OF DEFAULTS ------ //
const projectsList = document.getElementById("projects-list");

const defaultProject = new Project("Default Project");

let activeProject = defaultProject;

const defaultTodo = new Todo("Eat chicken", activeProject.title, "go back", "11/02/1993");
defaultTodo.addTodoToProject();

let projects = [];

function retrieveProjects() {
  if (localStorage.projects) {
    projects = JSON.parse(localStorage.projects);
    projects = reviveJSON();
    displayProjects();
  } else {
    defaultProject.addProjectToList();
    defaultProject.displayTodos();
  }
}

retrieveProjects();

// need to write a function to update the localStorage

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
  const newProject = new Project(name);
    // TEMPORARY TEST TODOS ADDED
    newProject.todos.push(new Todo("log in", "Work", "log on to PC", "14/01/2021"))
    newProject.todos.push(new Todo("rama", "krishna", "log on to PC", "14/01/2021"))
    newProject.addProjectToList();
    newProject.displayTodos();
    closeProjectsModal();
}

// When user clicks save, add project to projects list
const projectSaveBtn = document.getElementById("projectSave");
projectSaveBtn.addEventListener("click", () => createNewProject(projectTitle.value));

function closeProjectsModal() {
  projectsModal.style.display = "none";
}

// -------- END ADD PROJECTS MODAL ------- //

// FUNCTION TO INITIALISE NEW PROJECT OBJECT
// function addProject(name) {
//   console.log(name);
//   const newProject = new Project(name);
//   // TEMPORARY TEST TODO ADDED
//   newProject.todos.push(new Todo("log in", "Work", "log on to PC", "14/01/2021"))
//   newProject.todos.push(new Todo("rama", "krishna", "log on to PC", "14/01/2021"))
//   projects.push(newProject);
//   this.displayProjects();
//   closeProjectsModal();
// }



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
    
    projectDeleteBtn.addEventListener("click", function() {
      projects.splice(i, 1);
      // 3 possible scenarios - skip to one before, skip to one after, display blank
      console.log(projects[i]);
      console.log(projects);
      console.log(projects[i-1]);
      console.log(projects[i+1]);
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
      displayProjects();
    });
    newProjectDiv.classList.add("project-flex");
    newProjectDiv.addEventListener("mouseover", function() {
      projectDeleteBtn.style.opacity = 0.5});
    newProjectDiv.addEventListener("mouseout", function() {
      projectDeleteBtn.style.opacity = 0;
    });
    newProjectDiv.appendChild(projectDeleteBtn);
    console.log(projects[i]);
    newProjectTitle.addEventListener("click", () => projects[i].displayTodos());
    projectsList.appendChild(newProjectDiv);
  }
  updateLocalStorage();
}



function deleteTodo(e) {
activeProject.todos.splice(e.target.id, 1);
activeProject.displayTodos();
updateLocalStorage();
}
// projectBtn.addEventListener("click", () => addProject("Work"));
// projectBtn.addEventListener("click", () => addProject("Work"));

// need to write a function that creates a modal for project name input
// when click save, add project is run.

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
  const newTodo = new Todo (todoTitle.value, activeProject.title, todoDesc.value, todoDate.value);
  console.log(newTodo);
  // save new todo into the active project
  newTodo.addTodoToProject();
  activeProject.displayTodos();
  closeTodoModal();
  updateLocalStorage();
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

