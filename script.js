let todoContainer = document.getElementById("todoItemsContainer");
let addButton = document.getElementById("addtodolist");
let saveToDoButton = document.getElementById("saveToDo");
let userInput = document.getElementById("todoUserInput");


function getToDoList() {
    let strigifiedtodoList = localStorage.getItem("todoList");
    let parsedToDoList = JSON.parse(strigifiedtodoList);
    if (parsedToDoList === null) {
        return [];
    } else {
        return parsedToDoList;
    }
}

let todoList = getToDoList();
let todoCount = todoList.length;

saveToDoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onToDoStatus(labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachtodoId = "todo" + eachTodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let toDoObject = todoList[todoIndex];
    if (toDoObject.isChecked === true) {
        toDoObject.isChecked = false;
    } else {
        toDoObject.isChecked = true;
    }
    labelElement.classList.toggle("checked");
}

function onDelete(todoId) {
    let todoElement = document.getElementById(todoId);
    todoContainer.removeChild(todoElement);
    let deleteIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
    console.log(todoList);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoContainer.appendChild(todoElement);


    let inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onToDoStatus(labelId, todoId);
    };

    let labelConatainer = document.createElement("div");
    labelConatainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelConatainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelConatainer.appendChild(labelElement);

    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add("delete-icon-container");
    labelConatainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        onDelete(todoId);
    };
}

for (let eachtodo of todoList) {
    createAndAppendTodo(eachtodo);
}

function onAdd() {
    let userInputValue = userInput.value;
    todoCount = todoList.length;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    let newToDo = {
        text: userInputValue,
        uniqueNo: todoCount + 1,
        isChecked: false
    };
    todoList.push(newToDo);
    createAndAppendTodo(newToDo);
    userInput.value = "";
}

addButton.onclick = function() {
    onAdd();
}

userInput.addEventListener('keydown', function() {
    if (event.key === "Enter") {
        onAdd();
    }
});