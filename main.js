const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, tasks;
let updateNote = "";
let count;

window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  // Clear tasks
  tasksDiv.innerHTML = "";

  // Fetch All keys in localStorage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";

    // Get all values
    let value = localStorage.getItem(key);
    let tasksInnerDiv = document.createElement("div");
    tasksInnerDiv.classList.add("task");
    tasksInnerDiv.setAttribute("id", key);
    tasksInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

    //localStorage would store boolean as string, so we parse it to boolean back
    tasksInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
    tasksDiv.appendChild(tasksInnerDiv);

    // Add 'active' class to the task when created (darkmode)
    if (bodyDiv.classList.contains("active")) {
      tasksInnerDiv.classList.add("active");
    }
  }

  // Delete tasks
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      // delete from localStorage and remove div
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

// Remove task from localStorage
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

// Add tasks to localStorage
const updateStorage = (index, taskValue, completed) => {
  // Store boolean as a string in localStorage
  localStorage.setItem(`${index}_${taskValue}`, completed.toString());
  displayTasks();
};

// Add new task
document.querySelector("#push").addEventListener("click", () => {
  if (newTaskInput.value.length === 0) {
    alert("Task can't be empty!");
  } else {
    // Store locally and display from localStorage
    if (updateNote === "") {
      updateStorage(count, newTaskInput.value, false); // new task
    } else {
      // update task
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});



// Dark mode
const btn = document.querySelector(".btn");
const header = document.querySelector(".header");
const bodyDiv = document.querySelector("body");
const addBtn = document.getElementById("push");
const newTask = document.getElementById("new-task");
const tasksBlock = document.getElementById("tasks");
const input = document.querySelector("input");

btn.onclick = () => {
  btn.classList.toggle("active");
  header.classList.toggle("active");
  bodyDiv.classList.toggle("active");
  addBtn.classList.toggle("active");
  newTask.classList.toggle("active");
  tasksBlock.classList.toggle("active");
  input.classList.toggle("active");

  // Toggle the active class for tasks in dark mode
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    if (bodyDiv.classList.contains("active")) {
      task.classList.add("active");
    } else {
      task.classList.remove("active");
    }
  });
};

