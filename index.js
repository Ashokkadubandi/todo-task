function generateId(){
    const id = crypto.randomUUID()
    return id
}

function getFromLocalStorage(){
    const storage = localStorage.getItem('todo')
    if(storage){
        return JSON.parse(storage)
    }else{
        return []
    }
}


let todoList = getFromLocalStorage()
console.log(todoList)
let formSub = document.getElementById('formSub')
let taskName = document.getElementById('task-title')
let taskPrior = document.getElementById('prior')
let taskTimeDate = document.getElementById('time-date')
let todoTaskCon = document.getElementById('todo-task-cards')
let todoSvaBtn = document.getElementById('saveData')

todoSvaBtn.onclick = function(){
    console.log(todoList)
    localStorage.setItem("todo",JSON.stringify(todoList));

}


console.log(taskPrior.value)

let initialTodo = {taskName:'',priority:'',date:'',checked:false}

let todoObj = initialTodo


function craeteTodoContainerView(todo){
    console.log(todo)
    const {taskName,priority,date,check,id,notes} = todo
    const todoCard = document.createElement('div');
    const checkBox = document.createElement('input')
    const todoContent = document.createElement('div');
    const todoContentTaskName = document.createElement('h3');
    const todoConfig = document.createElement('div');
    const todoContentPrior = document.createElement('p');
    const todoContentDate = document.createElement('p')
    const todoEditContainer = document.createElement('div');
    const todoEditText = document.createElement('button')
    const todoDeleteText = document.createElement('button')

    const todoNotesCon = document.createElement('div')
    const todoNotesTextArea = document.createElement('textarea')
    todoNotesCon.appendChild(todoNotesTextArea);

    todoCard.classList.add('todo-card')


    const checkCheckBox = todoid => {
        todoList.forEach(each => {
            if(each.id === todoid){
                each.check = !each.check
            }
        })
        console.log(todoList)
    }


    todoTaskCon.appendChild(todoCard)

    checkBox.id = id
    checkBox.type = 'checkbox'
    checkBox.style.backgroundColor = 'red'
    checkBox.setAttribute('class','styled-checkbox')
    checkBox.checked = check
    checkBox.addEventListener('click',function(){
        checkCheckBox(id)
    })

    todoCard.appendChild(checkBox)
    todoCard.appendChild(todoContent)
    todoCard.append(todoEditContainer)

    todoContent.classList.add('todo-card-content')
    todoContent.appendChild(todoContentTaskName)
    todoContent.appendChild(todoConfig)

    todoContentTaskName.textContent = taskName
    todoContentTaskName.classList.add('todo-task-name')

    todoConfig.classList.add('todo-content-config')

    todoContentPrior.textContent = priority
    todoContentPrior.classList.add('todo-prior')
    if(priority === 'High'){
        // 37ff10
        todoContentPrior.style.backgroundColor = '#90EE90';
    }else if(priority === 'Medium'){
        // ffae00
        todoContentPrior.style.backgroundColor = '#FFA500';
    }else if(priority === 'Low'){
        todoContentPrior.style.backgroundColor = '#FF0000';
    }
    todoConfig.appendChild(todoContentPrior)

    todoContentDate.textContent = date
    todoContentDate.classList.add('todo-date')
    todoConfig.appendChild(todoContentDate)

    todoEditText.textContent = 'Edit'
    todoEditText.classList.add('edit-btn')
    todoEditText.onclick = function(){
        notes.status = !notes.status
        todoTaskCon.textContent = ''
        createTodoView()
    }

    todoDeleteText.textContent = 'Del'
    todoDeleteText.classList.add('del-btn')

    todoEditContainer.classList.add('todo-edit-container')

    todoEditContainer.appendChild(todoEditText)
    todoEditContainer.appendChild(todoDeleteText)

    todoNotesTextArea.addEventListener('keyup',function(e){
        if(e.key === 'Enter'){
            console.log(todoNotesTextArea.value)
            todo.taskName = todoNotesTextArea.value
            notes.status = !notes.status
            todoTaskCon.textContent = ''
            createTodoView()

        }
    })

    if(notes.status){
        todoCard.appendChild(todoNotesCon)
    }else{
        
        // todoCard.removeChild(todoNotesCon)
    }

}

function createTodoView(){
    if(todoList.length >= 1){
        todoList.map(eachTodo => {
            craeteTodoContainerView(eachTodo)
        })
    }
}

function checkValidations(){
    if(taskName.value === '' || taskPrior.value === '' || taskTimeDate.value === ''){
        alert('Please Enter all details of the todo')
        return false
    }
    return true
}

formSub.addEventListener('submit',function(e){
    e.preventDefault()
    if(checkValidations()){
        const newTodoObj = {
            id:generateId(),
            taskName:taskName.value,
            priority:taskPrior.value,
            date:taskTimeDate.value,
            check:false,
            notes:{
                state:false,
                content:''
            }
        }
        todoList.push(newTodoObj)
        taskName.value = ''
        taskPrior.value = 'Low'
        taskTimeDate.value = ''
        todoTaskCon.textContent = ''
        createTodoView()
    }
})

createTodoView()
