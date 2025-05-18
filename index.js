let c = 0
function generateId(){
    c = c+1
    return c
}

let todoList = []
let formSub = document.getElementById('formSub')
let taskName = document.getElementById('task-title')
let taskPrior = document.getElementById('prior')
let taskTimeDate = document.getElementById('time-date')
let todoTaskCon = document.getElementById('todo-task-cards')
let todoObj = {taskName:'',priority:'',date:'',checked:false}

taskName.addEventListener('keyup',function(e){
    todoObj.taskName = e.target.value
})

taskPrior.onchange = function(e){
    todoObj.priority = e.target.value
}
taskTimeDate.onchange = function(e){
    todoObj.date = e.target.value
}


function craeteTodoContainerView(todo){
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


    const checkCheckBox = id => {
        console.log(id)
        todoList.map(each => {
            if(each.id == id){
                each.checked = !each.checked
            }
        })
        console.log(todoList)
    }


    todoTaskCon.appendChild(todoCard)
    checkBox.type = 'checkbox'
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

    todoConfig.classList.add('todo-content-config')

    todoContentPrior.textContent = priority
    todoConfig.appendChild(todoContentPrior)

    todoContentDate.textContent = date
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
    todoObj.id = generateId()
    todoList.push(todoObj)
    todoTaskCon.textContent = ''
    createTodoView()
})
