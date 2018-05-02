// Define Ui veriabel //

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTasks);

}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
    
        // Create text node // 
        li.appendChild(document.createTextNode(task));
    
        // create link element
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    })

}
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a Task');
    }
    // Create li element 
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node // 
    li.appendChild(document.createTextNode(taskInput.value));

    // create link element

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    // Store in localStrorage //
    storeTaskInLocalStorage(taskInput.value); 
    taskInput.value = '';



    e.preventDefault();
}
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocal(e.target.parentElement.parentElement);
        }
        
    }

}

function removeTaskFromLocal(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTask() {
    // taskList.innerHTML = '';
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }

      clearTaskFromLocal();
}
function clearTaskFromLocal(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';

        }else{
            task.style.display = 'none';

        }

    });

}