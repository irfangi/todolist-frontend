import Swal from 'sweetalert2'
import moment from 'moment'
import {apiURL, apiHeader} from './config'

// element
const modalInput = document.getElementById('modalInputTodo')

// get data List
const getAllList = async () =>{
    contentTodo.innerHTML =''
    try {
        let response = await fetch(`${apiURL}todo_list?status=0`)
        if(response.status !== 200){
            alert(`error ${response.status} message: ${response.statusText}`)
        }else{
            let dataTodolist =  await response.json().then(data => {return data})
            dataTodolist.forEach((todo) =>{
                contentTodo.innerHTML += `
                    <todo-list target="${todo.id}"/>
                `
            })
            // addTodolistEvent()
        }

    } catch (error) {
        alert(error)
    }
}

const saveTodo = async () =>{
    const todoTitle = document.getElementById('todoTitle').value
    const todoDesc = document.getElementById('todoDesc').value

    if(todoTitle.trim() === ''){
        Swal.fire({
            title: 'Opps!',
            text: "Title Required!",
            icon: 'warning',
        })
    }else if(todoDesc.trim() ===''){
        Swal.fire({
            title: 'Opps!',
            text: "Description Required!",
            icon: 'warning',
        })
    }else{
        let dateNow = moment().format('Y-m-d H:mm:ss');
        let body = {
            "idUser": 1,
            "title": todoTitle,
            "desc": todoDesc,
            "status": 0,
            "created_at": dateNow,
            "updated_at": dateNow
          };
        let save = await fetch(`${apiURL}todo_list`, {
            method: 'POST',
            headers: apiHeader,
            body: JSON.stringify(body)
          });
        if(save.status !== 201){
            alert(`error ${save.status} message: ${save.statusText}`)
        }else{
            getAllList()
            modalInput.classList.toggle('active')
        }
    }
}

export {getAllList, saveTodo};