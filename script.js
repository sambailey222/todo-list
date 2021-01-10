// title, description, dueDate, notes
// objects to be stored within a project.
// project going to be an array comprised of objects (the todos)

// start out by creating a basic user interface that allows you to add todos and store them in an array

class Todo {
  constructor (title, project) {
    this.title = title;
    this.project = project;
    // this.description = description;
    // this.dueDate = dueDate;
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
// projects.push(work);
console.log(projects);


function addProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
  this.displayProjects();
}

function displayProjects() {
  projectsList.innerHTML = "";
  projects.forEach(function(project) {
    const newProjectTitle = document.createElement("h3");
    newProjectTitle.innerHTML = project.title;
    newProjectTitle.addEventListener("click", )
    projectsList.appendChild(newProjectTitle);
  })
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
  // that tab should display all of the todos stored in that project's items list.


