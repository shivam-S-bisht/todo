//onload
function renderTodos (prevTodos=[]) {
    const todos = JSON.parse(localStorage.getItem("todos")) || prevTodos
    todos.map (val=> {
        const todo = createTodoComponent(val.value)
        if (val.status) {
            todo.childNodes[0].style.textDecoration = "line-through"
            todo.style.backgroundColor = "#008f57"

        }
        document.getElementById("section").appendChild(todo)
    })
}


// helpers
function createTodoComponent (value) {
    const li = document.createElement("li");

    const p = document.createElement("p")
    const text = document.createTextNode(value);
    p.appendChild(text);

    const div = document.createElement("div")
    div.setAttribute("class", "button-continer");
    const button1 = document.createElement("button")
    button1.innerHTML = "Complete"
    const button2 = document.createElement("button")
    button2.innerHTML = "Remove"

    button1.name = "complete"
    button2.name = "remove"

    div.appendChild(button1)
    div.appendChild(button2)

    li.appendChild(p);
    li.appendChild(div);

    return li;
}

function handleComplete (idx) {
    const todos = JSON.parse(localStorage.getItem("todos"))
    todos[idx].status = true
    localStorage.setItem("todos", JSON.stringify(todos))
}

function handleRemove (idx) {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const fTodos = todos.filter ((_, i)=>i!=idx)
    localStorage.setItem("todos", JSON.stringify(fTodos))
}


// event listners
function addTodo (e) {
    e.preventDefault();
    const todoValue = e.target.elements.todo.value;
    if (todoValue=="") {
        alert("Add some text")
        return;
    }

    const todo = createTodoComponent(todoValue)
    document.getElementById("section").appendChild(todo)

    const todos = JSON.parse(localStorage.getItem("todos")) || []
    todos.push({value: todoValue, status: false})
    localStorage.setItem("todos", JSON.stringify(todos))

    document.todoForm.todo.value="";
}

function clickEventHandler (e) {
    const childIndex = Array.from(e.target.parentNode.parentNode.parentNode.children).indexOf(e.target.parentNode.parentNode)
    switch (e.target.name) {
        case "complete":
            handleComplete(childIndex)
            e.target.parentNode.parentNode.childNodes[0].style.textDecoration = "line-through"
            e.target.parentNode.parentNode.style.backgroundColor = "#008f57"
            break 
        case "remove":
            handleRemove(childIndex)
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
            // console.log(e.target.parentNode.parentNode.parentNode)
            break
    }
}