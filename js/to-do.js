const task = document.querySelector("#task");

let urg = 0,
  atent = 0,
  norm = 0;

function createTask(task) {
  const t = document.createElement("li");
  t.classList.add("name", "satatus-" + task.status);

  const title = document.createElement("h3");
  title.textContent = "";
}

function writeList() {
  urg = 0;
  ((atent = 0), (norm = 0));
}
