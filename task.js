// window.localStorage.clear();

//=====================================TODO=============================================
const newTaskInput = document.querySelector("[create-new-task]");
const countTask = document.querySelector("[tasks-data]");
// const deleteButton = document.querySelector("[delete-tasks-data]");
const butttonEdit = document.querySelector("[change-Task-Name]");
const selectedToDo = document.querySelector("[select]");

//========================================DOING==========================================
const colDoingNewTaskInput = document.querySelector(
  "[col-doing-create-new-task]"
);
const colDoingCountTask = document.querySelector("[col-doing-tasks-data]");

//========================================VERIFY==========================================
const colVerifyNewTaskInput = document.querySelector(
  "[col-verify-create-new-task]"
);
const colVerifyCountTask = document.querySelector("[col-verify-tasks-data]");

//=========================================DONE=========================================
const colDoneNewTaskInput = document.querySelector(
  "[col-done-create-new-task]"
);
const colDoneCountTask = document.querySelector("[col-done-tasks-data]");

//===================================================local=======================================================================================

const LOCAL_STRONG_TASKS_LISTS_KEY = "task.tasksArr";
const LOCAL_STRONG_SELECTED_TASKS_LISTS_ID_KEY = "task.selectedList";
let tasksArr =
  JSON.parse(localStorage.getItem(LOCAL_STRONG_TASKS_LISTS_KEY)) || [];
let selectedID = localStorage.getItem(LOCAL_STRONG_SELECTED_TASKS_LISTS_ID_KEY);
//===============================================================================================================================================

clearTask = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
showEditDailog = () => {
  document.getElementById("edit").style.display = "block";
};
closeEditForm = () => {
  document.getElementById("edit").style.display = "none";
};

findTask = idfind => {
  tasksArr.forEach(element => {
    if (element.id === idfind) {
      return element.taskName;
    }
  });
};

colTodoRender = () => {
  let idtasks = 1;
  clearTask(countTask);
  tasksArr.forEach(tasks => {
    idtasks++;
    if (tasks.category == "Todo") {
      const taskElement = document.createElement("li");
      taskElement.dataset.taskID = tasks.id;
      taskElement.classList.add("task");
      if (tasks.id === selectedID) {
        document.getElementById("detail").style.display = "block";
        document.getElementById("titleDailog").innerHTML = tasks.taskName;
        document.getElementById("categoryDailog").innerHTML = "In lists: " + tasks.category;
      }
      taskElement.innerHTML = tasks.taskName + "<span onclick='showEditDailog()' class='fa fa-pen updateIcon'></span>" +"<dialog id='edit' class='dialog-edit-form' ><div class='left-content-edit-form'><input class='input-edit' id='datachange'  value='"+ tasks.taskName +"' edit-title-task/><button type='submit' onclick='editSave("+ findTask(tasks.id) +")' class='save-data-edit'>Save</button><button onclick='closeEditForm()'>X</button></div><div class='right-content-edit-form'><button class='bt-edit-lable'><i class='fa fa-edit'></i> Edit-Lable</button><br><br><button class='bt-change-member'><i class='fa fa-user'></i>Change-Member</button><br><br><button class='bt-move'><i class=''>-></i>Move</button><br><br><button class='bt-Copy'><i class='fa fa-copy'></i>Copy</button><br><br><button class='bt-Change-due-date'><i class='fa fa-calender'></i>Change-Due-Date</button><br><br><button class='bt-delete'><i class='fa fa-remove'></i>Archive</button></div></dialog>";
      countTask.appendChild(taskElement);
    }
  });
};

// butttonEdit.addEventListener("click", function(){
//   const newTaskName = document.getElementById("data-edit").value;
//   if (newTaskName != null || newTaskName != "") {
//     localStorage.setItem(selectedID, newTaskName);
//     localStorage.setItem(LOCAL_STRONG_TASKS_LISTS_KEY, JSON.stringify(tasksArr));
//   }
// })

editSave = taskOld => {
  var cat = localStorage.getItem(taskOld);

  localStorage.setItem(cat, dataEdit);
  closeEditForm();
  render();
};

colDoingRender = () => {
  clearTask(colDoingCountTask);
  tasksArr.forEach(tasks => {
    if (tasks.category == "Doing") {
      const taskElement = document.createElement("div");
      taskElement.dataset.taskID = tasks.id;
      taskElement.classList.add("task"); // as class="task" in html
      taskElement.innerHTML =
        tasks.taskName +
        "<p style='display: none;'>" +
        tasks.id +
        "</p>" +
        "<span class='fa fa-pen updateIcon'></span>"; // print task name and button update
      colDoingCountTask.appendChild(taskElement);
    }
  });
};

colVerifyRender = () => {
  clearTask(colVerifyCountTask);
  tasksArr.forEach(tasks => {
    if (tasks.category == "Verify") {
      const taskElement = document.createElement("div");
      taskElement.dataset.taskID = tasks.id;
      taskElement.classList.add("task"); // as class="task" in html
      taskElement.innerHTML =
        tasks.taskName +
        "<p style='display: none;'>" +
        tasks.id +
        "</p>" +
        "<span class='fa fa-pen updateIcon'></span>"; // print task name and button update
      colVerifyCountTask.appendChild(taskElement);
    }
  });
};

colDoneRender = () => {
  clearTask(colDoneCountTask);
  tasksArr.forEach(tasks => {
    if (tasks.category == "Done") {
      const taskElement = document.createElement("div");
      taskElement.dataset.taskID = tasks.id;
      taskElement.classList.add("task"); // as class="task" in html
      taskElement.innerHTML =
        tasks.taskName +
        "<p style='display: none;'>" +
        tasks.id +
        "</p>" +
        "<span class='fa fa-pen updateIcon'></span>"; // print task name and button update
      colDoneCountTask.appendChild(taskElement);
    }
  });
};

saveLocalAndRender = () => {
  saveLocal();
  colTodoRender();
};

colDoingSaveLocalAndRender = () => {
  saveLocal();
  colDoingRender();
};

colVerifySaveLocalAndRender = () => {
  saveLocal();
  colVerifyRender();
};

colDoneSaveLocalAndRender = () => {
  saveLocal();
  colDoneRender();
};

saveLocal = () => {
  localStorage.setItem(LOCAL_STRONG_TASKS_LISTS_KEY, JSON.stringify(tasksArr));
  localStorage.setItem(LOCAL_STRONG_SELECTED_TASKS_LISTS_ID_KEY, selectedID);
};

render = () => {
  colDoingSaveLocalAndRender();
  saveLocalAndRender();
  colDoneSaveLocalAndRender();
  colVerifySaveLocalAndRender();
};
render();
countTask.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedID = e.target.dataset.taskID;
    saveLocalAndRender();
  }
});
// render all item in col Todo ==================================

addTask = () => {
  const listTasks = newTaskInput.value;
  if (listTasks == null || listTasks === "") return;
  const task = createTask(listTasks);
  newTaskInput.value = null;
  tasksArr.push(task);
  saveLocalAndRender();
};

createTask = taskName => {
  return {
    category: "Todo",
    id: Date.now().toString(),
    taskName: taskName,
    tasks: []
  }; // create a new task
};

// dropdown Open of col Todo
showFormAdd = () => {
  document.getElementById("newTask").style.display = "block";
};

showMore = () => {
  document.getElementById("more").style.display = "block";
};

showActionPage = () => {
  document.getElementById("moreAction").style.display = "block";
};

//dropdown Close of col Todo
closeFormAdd = () => {
  document.getElementById("newTask").style.display = "none";
};

closeMore = () => {
  document.getElementById("more").style.display = "none";
};

closeActionPage = () => {
  document.getElementById("moreAction").style.display = "none";
};

// render all item in col doing======================================================================================

colDoingAddTask = () => {
  const listTasks = colDoingNewTaskInput.value;
  if (listTasks == null || listTasks === "") return;
  const task = colDoingCreateTask(listTasks);
  colDoingNewTaskInput.value = null;
  tasksArr.push(task);
  colDoingSaveLocalAndRender();
};

colDoingCreateTask = taskName => {
  return {
    category: "Doing",
    id: Date.now().toString(),
    taskName: taskName,
    tasks: []
  }; // create a new task
};

// dropdown Open of col Doing
doing_ShowFormAdd = () => {
  document.getElementById("doing_NewTask").style.display = "block";
};

doing_ShowMore = () => {
  document.getElementById("doing_More").style.display = "block";
};

doing_ShowActionPage = () => {
  document.getElementById("doing_MoreAction").style.display = "block";
};

//dropdown Close of col Doing
doing_CloseFormAdd = () => {
  document.getElementById("doing_NewTask").style.display = "none";
};

doing_CloseMore = () => {
  document.getElementById("doing_More").style.display = "none";
};

doing_CloseActionPage = () => {
  document.getElementById("doing_MoreAction").style.display = "none";
};

// render all item in col verify======================================================================================

colVerifyAddTask = () => {
  const listTasks = colVerifyNewTaskInput.value;
  if (listTasks == null || listTasks === "") return;
  const task = colVerifyCreateTask(listTasks);
  colVerifyNewTaskInput.value = null;
  tasksArr.push(task);
  colVerifySaveLocalAndRender();
};

colVerifyCreateTask = taskName => {
  return {
    category: "Verify",
    id: Date.now().toString(),
    taskName: taskName,
    tasks: []
  }; // create a new task
};

// dropdown Open of col verify
verify_ShowFormAdd = () => {
  document.getElementById("verify_NewTask").style.display = "block";
};

verify_ShowMore = () => {
  document.getElementById("verify_More").style.display = "block";
};

verify_ShowActionPage = () => {
  document.getElementById("verify_MoreAction").style.display = "block";
};

//dropdown Close of col verify
verify_CloseFormAdd = () => {
  document.getElementById("verify_NewTask").style.display = "none";
};

verify_CloseMore = () => {
  document.getElementById("verify_More").style.display = "none";
};

verify_CloseActionPage = () => {
  document.getElementById("verify_MoreAction").style.display = "none";
};

// render all item in col done======================================================================================

colDoneAddTask = () => {
  const listTasks = colDoneNewTaskInput.value;
  if (listTasks == null || listTasks === "") return;
  const task = colDoneCreateTask(listTasks);
  colDoneNewTaskInput.value = null;
  tasksArr.push(task);
  colDoneSaveLocalAndRender();
};

colDoneCreateTask = taskName => {
  return {
    category: "Done",
    id: Date.now().toString(),
    taskName: taskName,
    tasks: []
  }; // create a new task
};

// dropdown Open of col done
done_ShowFormAdd = () => {
  document.getElementById("done_NewTask").style.display = "block";
};

done_ShowMore = () => {
  document.getElementById("done_More").style.display = "block";
};

done_ShowActionPage = () => {
  document.getElementById("done_MoreAction").style.display = "block";
};

//dropdown Close of col done
done_CloseFormAdd = () => {
  document.getElementById("done_NewTask").style.display = "none";
};

done_CloseMore = () => {
  document.getElementById("done_More").style.display = "none";
};

done_CloseActionPage = () => {
  document.getElementById("done_MoreAction").style.display = "none";
};

//=======================all col===================================================
saveLocal = () => {
  localStorage.setItem(LOCAL_STRONG_TASKS_LISTS_KEY, JSON.stringify(tasksArr));
};

taskDetail = () => {
  alert("Edit page");
};

closeDailog = () => {
  document.getElementById("detail").style.display = "none";
};
