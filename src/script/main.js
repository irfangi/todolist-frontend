import Swal from 'sweetalert2'

const main = () =>{
    //element
    const allList = document.querySelectorAll('.todo-list')
    const createNewTodo = document.getElementById('createNewTodo')
    const cancelInputTodo = document.getElementById('cancelInputTodo')
    const modalInput = document.getElementById('modalInputTodo')
    const modalDetailTodo = document.getElementById('modalDetailTodo')

    //function
    const toggleModalInputTodo = () =>{
        modalInput.classList.toggle('active')
    }
    
    //event
    allList.forEach((node) =>{
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
        node.querySelector('h4.text-sm').addEventListener('click', ()=>{
            modalDetailTodo.classList.toggle('active')
        })
        node.querySelector('i.icon-trash-empty').addEventListener('click', ()=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        })
        node.querySelector('i.icon-check').addEventListener('click', () =>{
            alert('done')
        })
    })

    modalDetailTodo.querySelector('.button-close-modal').addEventListener('click', () =>{
        modalDetailTodo.classList.toggle('active')
    })
    
    modalInput.querySelector('.button-close-modal').addEventListener('click', () =>{
        modalInput.classList.toggle('active')
    })

    createNewTodo.addEventListener('click', toggleModalInputTodo)
    cancelInputTodo.addEventListener('click', toggleModalInputTodo)

    
}
export default main;