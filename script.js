document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var taskInput = document.getElementById("task-input");
    var prioritySelect = document.getElementById("priority-select");

    if (taskInput.value.trim() !== "") {
        var task = {
            text: taskInput.value.trim(),
            priority: prioritySelect.value
        };

        saveTask(task);
        addTaskToList(task);

        taskInput.value = "";
        prioritySelect.selectedIndex = 0;
    }
});

function saveTask(task) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "save.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("task=" + JSON.stringify(task));
}

function addTaskToList(task) {
    var taskList = document.getElementById("task-list");
    var listItem = document.createElement("li");
    listItem.className = task.priority;

    var taskText = document.createElement("span");
    taskText.innerHTML = task.text;
    listItem.appendChild(taskText);

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteTask(this.parentNode);
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

document.getElementById("filter-select").addEventListener("change", function () {
    var filterValue = this.value;

    var taskListItems = document.getElementById("task-list").getElementsByTagName("li");
    for (var i = 0; i < taskListItems.length; i++) {
        var listItem = taskListItems[i];
        if (filterValue === "all" || listItem.className === filterValue) {
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
        }
    }
});

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}
