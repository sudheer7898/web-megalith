alert("this is a To Do List")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveitem() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function add() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("prioritySelect").value;
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false, priority });
    input.value = "";
    saveitem();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveitem();
    renderTasks();
}

function delitem(index) {
    tasks.splice(index, 1);
    saveitem();
    renderTasks();
}

function filterbytype(filter) {
    currentFilter = filter;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const filtered = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const span = document.createElement("span");
        span.innerHTML = `<span class="priority-${task.priority}">${task.text}</span> (${task.priority})`;
        span.style.cursor = "pointer";
        span.onclick = () => toggleComplete(tasks.indexOf(task));

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => delitem(tasks.indexOf(task));

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

renderTasks();