document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const clearButton = document.getElementById("clear-btn");
    
    const activityField = document.getElementById("activity");
    const activity = document.getElementById("activity").value;
    const price = document.getElementById("price").value;
    const type = document.getElementById("type").value;
    const isBookingRequired = document.getElementById("isBookingRequired").value;
    const accessibility = document.getElementById("accessibility").value;

    const todo = [activity,price,type,isBookingRequired,accessibility];



    // Load tasks from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveAndRender() {
        localStorage.setItem("todos", JSON.stringify(todo));
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = ""; // Clear list before re-rendering
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${todo} <button class="delete-btn" data-index="${index}">X</button>`;
            todoList.appendChild(li);
        });

        // Attach delete event to each button
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                todos.splice(index, 1);
                saveAndRender();
            });
        });
    }

    addButton.addEventListener("click", () => {
        const task = activityField.value.trim();
        if (task === "") {
            alert("Please enter a task!");
            return;
        }
        todos.push(task);
        saveAndRender();
        inputField.value = "";
    });

    clearButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all tasks?")) {
            todos = [];
            saveAndRender();
        }
    });

    // Initial rendering of saved tasks
    renderTodos();

    const listItems = todoList.getElementsByTagName('li');
    const itemCount = listItems.length;
    const counter = document.getElementById("counter");
    counter.innerHTML = itemCount
});
