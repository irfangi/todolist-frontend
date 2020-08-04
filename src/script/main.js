const main = () =>{
    //element
    const allList = document.querySelectorAll('.todo-list')
    const createNewTodo = document.getElementById('createNewTodo')
    const cancelInputTodo = document.getElementById('cancelInputTodo')
    const modalInput = document.getElementById('modalInputTodo')

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
    })
    
    createNewTodo.addEventListener('click', toggleModalInputTodo)
    cancelInputTodo.addEventListener('click', toggleModalInputTodo)

    
}
export default main;