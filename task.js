localStorage = null;
const newTaskInput = document.querySelector("[create-new-task]");
const countTask = document.querySelector("[tasks-data]");
// const deleteButton = document.querySelector("[delete-tasks-data]");
const updateButton = document.querySelector("[update-tasks-data]");
const LOCAL_STRONG_TASKS_LISTS_KEY = "task.tasksArr";
let tasksArr = JSON.parse(localStorage.getItem(LOCAL_STRONG_TASKS_LISTS_KEY)) || []
// window.localStorage.clear(); 
// render all item 
render = () => {
  clearTask(countTask);
  tasksArr.forEach(tasks => {
    const taskElement = document.createElement("div");
    taskElement.dataset.taskID = tasks.id; 
    taskElement.classList.add("task"); // as class="task" in html
    taskElement.innerHTML = tasks.taskName + "<p style='display: none;'>" + tasks.id + "</p>" + "<span class='fa fa-pen updateIcon'></span>"; // print task name and button update
    countTask.appendChild(taskElement);
   
  });
}

function deleteTask(Id) {
  tasksArr.forEach(tasks => {
    if( tasks.id == Id ){
        window.localStorage.clear(task.id)
    }
  });
  render();
} 
saveLocal = () => {
  localStorage.setItem(LOCAL_STRONG_TASKS_LISTS_KEY,JSON.stringify(tasksArr))
}

saveLocalAndRender = () => {
  saveLocal();
  render();
}

taskDetail = () => {
  alert("Edit page")
}


 
clearTask = (element) => {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

addTask = () => {
  const listTasks = newTaskInput.value;
  if (listTasks == null || listTasks === "") return;
  const task = createTask(listTasks);
  newTaskInput.value = null;
  tasksArr.push(task);
  saveLocalAndRender();
};

updateTask = (Id, nameChange) => {
  tasksArr.forEach(tasks => {
    if( tasks.id == Id ){
      tasks.taskName = nameChange;
    }
  });
  render();
}

createTask = taskName => {
  return { id: Date.now().toString(), taskName: taskName, tasks: [] };// create a new task
};


// dropdown Open
showFormAdd = () => {
  document.getElementById("newTask").style.display = "block";
};

showMore = () => {
  document.getElementById("more").style.display = "block";
}

showActionPage = () => {
  document.getElementById("moreAction").style.display = "block";
}

//dropdown Close
closeFormAdd = () => {
  document.getElementById("newTask").style.display = "none";
};

closeMore = () => {
  document.getElementById("more").style.display = "none";
} 

closeActionPage = () => {
  document.getElementById("moreAction").style.display = "none";
}
