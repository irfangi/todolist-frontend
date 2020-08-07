import './todo.js'
import {getAllList, saveTodo} from './service'

const main = () =>{
    //element
    const createNewTodo = document.getElementById('createNewTodo')
    const cancelInputTodo = document.getElementById('cancelInputTodo')
    const modalInput = document.getElementById('modalInputTodo')
    const modalDetailTodo = document.getElementById('modalDetailTodo')
    const btnSaveTodo = document.getElementById('btnSaveTodo')  

    //function
    const toggleModalInputTodo = () =>{
        modalInput.classList.toggle('active')
    }
    //on init
    getAllList()

    //event
    modalDetailTodo.querySelector('.button-close-modal').addEventListener('click', () =>{
        modalDetailTodo.classList.toggle('active')
    })
    
    modalInput.querySelector('.button-close-modal').addEventListener('click', () =>{
        modalInput.classList.toggle('active')
    })

    createNewTodo.addEventListener('click', toggleModalInputTodo)
    cancelInputTodo.addEventListener('click', toggleModalInputTodo)
    btnSaveTodo.addEventListener('click', saveTodo)
    
}
export default main;