import Swal from 'sweetalert2'
import moment from 'moment'
const main = () =>{
    //element
    const createNewTodo = document.getElementById('createNewTodo')
    const cancelInputTodo = document.getElementById('cancelInputTodo')
    const modalInput = document.getElementById('modalInputTodo')
    const modalDetailTodo = document.getElementById('modalDetailTodo')
    const contentTodo = document.getElementById('contentTodo')
    const btnSaveTodo = document.getElementById('btnSaveTodo')  

    //function
    // event list
    const addTodolistEvent = () =>{
        const allList = document.querySelectorAll('.todo-list')
        
        allList.forEach((node) =>{
            let idList = node.querySelector('input').value;
            const arrowButton = node.querySelector('span i')
            const actionButton = node.querySelector('div.action-button')
            arrowButton.addEventListener("click", () =>{
                if(arrowButton.classList.contains('icon-right-open')){
                    arrowButton.classList.toggle('icon-left-open')
                }else{
                    arrowButton.classList.toggle('icon-right-open')
                }
                node.classList.toggle('active')
                actionButton.classList.toggle('hidden')
            })

            node.querySelector('h4.text-sm').addEventListener('click', async ()=>{
                try {
                    let response  = await fetch( `http://localhost:3000/todo_list/${idList}`);
                    let detail = await response.json()
                    modalDetailTodo.querySelector('h4').innerHTML = detail.title
                    modalDetailTodo.querySelector('p').innerHTML = detail.desc
                } catch (error) {
                    alert(error)
                }
                modalDetailTodo.classList.toggle('active')
            })
            node.querySelector('i.icon-trash-empty').addEventListener('click', ()=>{
                Swal.fire({
                    title: 'Yakin?',
                    text: "Akan menghapus Todo ini?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Batal',
                    confirmButtonText: 'Yakin'
                  }).then(async (result) => {
                    if (result.value) {
                      try {
                          let response = await fetch(`http://localhost:3000/todo_list/${idList}`,{
                            method: 'DELETE',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                          })
                          if(response.status !== 200){
                            Swal.fire({
                                title:'Oops!',
                                text:'Gagal Delete todo',
                                icon:'error'
                            })
                          }else{
                            getAllList()
                          }
                      } catch (error) {
                          alert(error)
                      }
                    }
                  })
            })
            node.querySelector('i.icon-check').addEventListener('click', () =>{
                Swal.fire({
                    title: 'Yakin?',
                    text: "Akan menyelesaikan Todo ini?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Batal',
                    confirmButtonText: 'Yakin!'
                  }).then(async (result) => {
                    if (result.value) {
                      try {
                            let detailbyid  = await fetch( `http://localhost:3000/todo_list/${idList}`);
                            let detail = await detailbyid.json()
                            let dateNow = moment().format('Y-m-d H:mm:ss');
                            detail.status = 1
                            detail.updated_at = dateNow
                            let response = await fetch(`http://localhost:3000/todo_list/${idList}`,{
                            method: 'PUT',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body:JSON.stringify(detail)
                          })
                          if(response.status !== 200){
                            Swal.fire({
                                title:'Oops!',
                                text:'Gagal Selesaikan todo',
                                icon:'error'
                            })
                          }else{
                            getAllList()
                          }
                      } catch (error) {
                          alert(error)
                      }
                    }
                  })
            })
        })
    }
    // input modal
    const toggleModalInputTodo = () =>{
        modalInput.classList.toggle('active')
    }
    // get data List
    const getAllList = async () =>{
        contentTodo.innerHTML =''
        try {
            let response = await fetch('http://localhost:3000/todo_list?status=0')
            if(response.status !== 200){
                alert(`error ${response.status} message: ${response.statusText}`)
            }else{
                let dataTodolist =  await response.json().then(data => {return data})
                dataTodolist.forEach((todo) =>{
                    contentTodo.innerHTML += `
                        <div class="flex justify-between mb-3 rounded todo-list">
                            <input type="hidden" value="${todo.id}"/>
                            <div class="p-3 bg-gray-800 w-full rounded flex justify-between">
                                <div class="todo-icon">
                                    <i class="icon-sticky-note-o"></i>
                                </div>
                                <div class="w-full">
                                    <h4 class="text-sm">${todo.title}</h4>
                                </div>
                                <span><i class="icon-right-open"></i></span>
                            </div>
                            <div class="flex action-button hidden">
                                <div class="bg-red-700 p-3 rounded ml-2"><span><i class="icon-trash-empty"></i></span></div>
                                <div class="bg-green-700 p-3 rounded ml-2"><i class="icon-check"></i></div>
                            </div>
                        </div>
                    `
                })
                addTodolistEvent()
            }

        } catch (error) {
            alert(error)
        }
    }

    // save TOdo
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
            let save = await fetch('http://localhost:3000/todo_list', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
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