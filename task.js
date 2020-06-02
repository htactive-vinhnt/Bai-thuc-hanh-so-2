let tasksArr = [
  {
    task: "task 1",
    description: "doing now"
  },
  {
    task: "task 2",
    description: "doing now"
  },
  {
    task: "task 3",
    description: "doing now"
  }
];

let textTitle = "";

for (i = 0; i < tasksArr.length; i++) {
  textTitle += "<p class='task'>" + tasksArr[i].task + "</p><br>";
}
document.getElementById("showTask").innerHTML = textTitle;

function addTask() {
  var titleTask = document.getElementById("titleTask").value;
    tasksArr.push(titleTask);
}

function showFormAdd() {
  document.getElementById("newTask").style.display = "block";
}

closeFormAdd = () => {
    document.getElementById("newTask").style.display = "none";
}
