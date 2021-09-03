
const TodoArray = [];

document.querySelector('#btn').addEventListener('click',()=>{
    var desc = document.querySelector('#desc').value;
    var time = document.querySelector('#time').value;
    var todoObject = {
            desc:desc,
            time:time,
            alert:null
    }
    TodoArray.push(todoObject);
    document.querySelector('#desc').value = "";
    document.querySelector('#time').value ="";
    RenderList();

    console.log(TodoArray);
})

function RenderList(){
    var innerHtml = "";
    TodoArray.forEach((todo,index) => {
        innerHtml+=`<li class="todo-item"><div>
        <div style="display: flex;">
        <div class="info"><h3>${todo.desc}</h3><p class="date">${todo.time}</p> <p class="alert">${todo.alert?todo.alert:''}</p></div><div class="buttons">
            <button id="mark${index}" type="button">Mark as Done</button>
            <button id="remove${index}" type="button">Remove</button></div>
        </div>
       
    </div></li>`
    });

    document.querySelector(".todo-list").innerHTML=innerHtml;

    var lists = document.querySelectorAll(".todo-item");

    for(var i =0;i<lists.length;i++){
        lists[i].querySelector(`#mark${i}`).addEventListener('click',(e=>{
            const index = e.target.id[e.target.id.length-1];
            TodoArray[index].alert = "task accomplished";
            RenderList();
        }))
        lists[i].querySelector(`#remove${i}`).addEventListener('click',(e=>{
            const index = e.target.id[e.target.id.length-1];
            TodoArray.splice(index,1);
            RenderList();
        }))
    }
}

var d;
setInterval(() => {
    var today = new Date();
    console.log('invoked');
    TodoArray.forEach(todo => {
   
        var timeOfTodo = new Date(todo.time);
        d=timeOfTodo.getTime()-today.getTime();
        if(d<0){
            if(!todo.alert){
                todo.alert = 'you forgot me';
            }
        }
        console.log(d);
    });
    
    RenderList();
  
}, 1000);


