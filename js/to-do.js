const task = document.querySelector("#task");

let urg = 0,
  atent = 0,
  norm = 0,
  pend = 0,
  conc = 0;

let tasks = [
  {
    num: 1,
    name: "Add Tarefas",
    date: 2025 - 10 - 28,
    lvl: "atent",
    status: "pend",
  },
];

function createTask(task) {
  const t = document.createElement("li");
  t.classList.add("task", "satatus-" + task.status);

  const title = document.createElement("h3");
  title.textContent = task.num + 1 + "# - " + task.name + "\n" + task.date;

  t.append(title);
  taskList.append(t);

  const change = document.createElement("button");
  if (task.status === "pend") {
    change.textContent = "Concluir";
  } else {
    change.textContent = "Retornar para a lista";
  }

  change.addEventListener("click", (event) => {
    if (task.status === "pend") {
      task.status = "conc";
    } else {
      task.status = "pend";
    }
    writeList();
  });
  t.append(change);

  const trash = document.createElement("button");
  trash.addEventListener("click", (event) => {
    if (
      confirm("Deseja excluir tarefa: " + task.num + " - " + task.name + "?")
    ) {
      tasks = tasks.filter((t) => t !== task);
      writeList();
    }
  });
  t.append(trash);

  return t;
}

function writeList() {
  urg = 0;
  atent = 0;
  norm = 0;
  pend = 0;
  conc = 0;

  tasks.forEach((task) => {
    if (task.status === "pend") {
      pending++;
    } else {
      concluded++;
    }
  });
}
