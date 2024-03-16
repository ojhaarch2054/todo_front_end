const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}

// To fetch data from server to the frontend
const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
    }).catch((error) => {
        alert(error)
    })    
}

//To save data to the server from the frontend
const saveTask = async(task) => {
    try{
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch(error) {
        alert("Error saving task " + error.message)
    }
}

input.addEventListener("keypress",(event) => {
    if(event.key ==="Enter") {
        event.preventDefault()
        const task = input.value.trim()
        if(task != '') {
            saveTask(task).then((json) => {
                renderTask(task)
            input.value = ""
            })            
        }
    }
})

getTasks()