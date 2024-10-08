/*
  1- Select element
*/

// Select element
let input = document.querySelector(".input");
let supmit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// Check if tasks exist in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// get tasks from local storage and add them to page
getTasksFromLocalStorage();

// Add an event listener to detect the "Enter" keypress
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // Trigger the click event on th`e submit button when Enter is pressed
    supmit.click();
  }
});

supmit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    addTasksFromArrayToPage(arrayOfTasks);
    addTasksToLocalStorageFrom(arrayOfTasks);
    // Empty The input Fieald
    input.value = "";
  }
};

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    status: false,
  };
  arrayOfTasks.push(task);
}

function addTasksFromArrayToPage(arrayOfTasks) {
  // Empty The Div Tasks
  tasksDiv.innerHTML = "";
  // Looping in array of tasks
  arrayOfTasks.forEach((task) => {
    // Main Task
    let div = document.createElement("div");
    div.className = "task";
    if (task.status) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.textContent = task.title;

    // Main Buttns Div
    let buttunsDiv = document.createElement("div");
    buttunsDiv.className = "buttuns";
    div.appendChild(buttunsDiv);

    // Delete Span
    let delButt = document.createElement("span");
    delButt.className = "delete";
    delButt.textContent = "Delete";
    buttunsDiv.appendChild(delButt);

    // Done Span
    let doneBut = document.createElement("span");
    doneBut.className = "complete";
    doneBut.textContent = "Done";
    buttunsDiv.appendChild(doneBut);

    // Append Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

// Event Delegation for Delete and Complete buttons
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Remove Element From Page
    e.target.parentElement.parentElement.remove();
    deleteTask(e.target.parentElement.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("complete")) {
    completeTask(e.target.parentElement.parentElement, arrayOfTasks);
    // To Update Local Storage
    addTasksToLocalStorageFrom(arrayOfTasks);
  }
});

function completeTask(task, arrayOfTasks) {
  task.className = "task done";

  // Make Status True
  let taskId = task.getAttribute("data-id");
  let taskObj = arrayOfTasks.find((task) => task.id == taskId);
  if (taskObj) {
    // Edit the object itself
    taskObj.status = true;
  }
}

function deleteTask(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  // To Update Local Storage
  addTasksToLocalStorageFrom(arrayOfTasks);
}

function addTasksToLocalStorageFrom(arrayOfTasks) {
  // window.localStorage.removeItem("tasks");
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksFromArrayToPage(tasks);
  }
}
