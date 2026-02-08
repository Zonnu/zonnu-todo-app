const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyState(tasks) {
  emptyState.hidden = tasks.length > 0;
}

function renderTask(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
  li.remove();
  const tasks = loadTasks().filter((t) => t !== taskText);
  saveTasks(tasks);
  updateEmptyState(tasks);
  });


  list.appendChild(li);
}

function renderAll(tasks) {
  list.innerHTML = "";
  updateEmptyState(tasks);
  tasks.forEach(renderTask);
}

const tasks = loadTasks();
renderAll(tasks);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  const updated = loadTasks();
  updated.push(taskText);
  saveTasks(updated);
  updateEmptyState(updated);

  renderTask(taskText);
  input.value = "";
});
