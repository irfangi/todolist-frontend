const main = () =>{
    const allList = document.querySelectorAll('.todo-list')
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
}
export default main;