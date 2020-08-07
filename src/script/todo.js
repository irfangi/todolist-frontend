import Swal from 'sweetalert2'
import moment from 'moment'
import {getAllList} from './service'
import {apiURL, apiHeader} from './config'

class Todo extends HTMLElement{
    get idList(){
        return this.getAttribute('target')
    }
    connectedCallback(){
        this.render()
    }
    async render() {
        
        try {
            const res = await fetch(`${apiURL}todo_list/${this.idList}`)
            const detail = await res.json()
            this.innerHTML = `
                <div class="flex justify-between mb-3 rounded todo-list">
                    <div class="p-3 bg-gray-800 w-full rounded flex justify-between">
                        <div class="todo-icon">
                            <i class="icon-sticky-note-o"></i>
                        </div>
                        <div class="w-full">
                            <h4 class="text-sm">${detail.title}</h4>
                        </div>
                        <span><i class="icon-right-open"></i></span>
                    </div>
                    <div class="flex action-button hidden">
                        <div class="bg-red-700 p-3 rounded ml-2"><span><i class="icon-trash-empty"></i></span></div>
                        <div class="bg-green-700 p-3 rounded ml-2"><i class="icon-check"></i></div>
                    </div>
                </div>`

            //event
            this.eventList(this)
        } catch (error) {
            alert(error)
        }
    }

    eventList(node){
        const modalDetailTodo = document.getElementById('modalDetailTodo')

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
                    let response  = await fetch( `${apiURL}todo_list/${this.idList}`);
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
                          let response = await fetch(`${apiURL}todo_list/${this.idList}`,{
                            method: 'DELETE',
                            headers: apiHeader,
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
                            let detailbyid  = await fetch( `${apiURL}todo_list/${this.idList}`);
                            let detail = await detailbyid.json()
                            let dateNow = moment().format('Y-m-d H:mm:ss');
                            detail.status = 1
                            detail.updated_at = dateNow
                            let response = await fetch(`${apiURL}todo_list/${this.idList}`,{
                            method: 'PUT',
                            headers: apiHeader,
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
    }
}

customElements.define("todo-list" , Todo)