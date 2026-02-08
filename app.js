const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const clearBtn = document.getElementById("clear-btn");

function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyState(tasks) {
  emptyState.hidden = tasks.length > 0;
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    deleteTask(taskText);
  });

  return li;
}

function renderTasks(tasks) {
  list.innerHTML = "";
  tasks.forEach(function (task) {
    list.appendChild(createTaskElement(task));
  });
  updateEmptyState(tasks);
}

function addTask(taskText) {
  const tasks = loadTasks();
  tasks.push(taskText);
  saveTasks(tasks);
  renderTasks(tasks);
}

function deleteTask(taskText) {
  const tasks = loadTasks().filter(function (t) {
    return t !== taskText;
  });
  saveTasks(tasks);
  renderTasks(tasks);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  addTask(taskText);
  input.value = "";
});

clearBtn.addEventListener("click", function () {
  localStorage.setItem("tasks", JSON.stringify([]));
  list.innerHTML = "";
  updateEmptyState([]);
});


const tasks = loadTasks();
renderTasks(tasks);
