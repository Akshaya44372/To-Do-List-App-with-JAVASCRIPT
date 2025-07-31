let taskList = [];

window.onload = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
    renderTasks();
  }
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    taskList.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <span onclick="deleteTask(${index})">✖</span>
    `;
    ul.appendChild(li);
  });
}
