function generateId(){
    const id = crypto.randomUUID()
    return id
}

let todoList = []
let formSub = document.getElementById('formSub')
let taskName = document.getElementById('task-title')
let taskPrior = document.getElementById('prior')
let taskTimeDate = document.getElementById('time-date')
let todoTaskCon = document.getElementById('todo-task-cards')

console.log(taskPrior.value)

let initialTodo = {taskName:'',priority:'',date:'',checked:false}

let todoObj = initialTodo


function craeteTodoContainerView(todo){
    console.log(todo)
    const {taskName,priority,date,checked,id} = todo
    const todoCard = document.createElement('div');
    const checkBox = document.createElement('input')
    const todoContent = document.createElement('div');
    const todoContentTaskName = document.createElement('h3');
    const todoConfig = document.createElement('div');
    const todoContentPrior = document.createElement('p');
    const todoContentDate = document.createElement('p')
    const todoEditContainer = document.createElement('div');
    const todoEditText = document.createElement('p')
    const todoDeleteText = document.createElement('p')

    todoCard.classList.add('todo-card')


    const checkCheckBox = todoid => {
        todoList.map(each => {
            if(each.id === todoid){
                each.check = !each.check
            }
        })
        console.log(todoList)
    }


    todoTaskCon.appendChild(todoCard)

    checkBox.id = id
    checkBox.type = 'checkbox'
    checkBox.classList.add('check-box')
    checkBox.checked = checked
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
    todoDeleteText.textContent = 'Del'

    todoEditContainer.appendChild(todoEditText)
    todoEditContainer.appendChild(todoDeleteText)

}

function createTodoView(){
    if(todoList.length >= 1){
        todoList.map(eachTodo => {
            craeteTodoContainerView(eachTodo)
        })
    }
}



formSub.addEventListener('submit',function(e){
    e.preventDefault()
    const newTodoObj = {
        id:generateId(),
        taskName:taskName.value,
        priority:taskPrior.value,
        date:taskTimeDate.value,
        check:false
    }
    todoList.push(newTodoObj)
    taskName.value = ''
    taskPrior.value = ''
    taskTimeDate.value = ''
    todoTaskCon.textContent = ''
    createTodoView()
})
