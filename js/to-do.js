const task = document.querySelector("#task");
const formTask = document.querySelector("#formTask");
const listDescript = document.querySelector("#listDescript");

const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

let filters = "all";

let urg = 0,
  atent = 0,
  norm = 0,
  pending = 0,
  concluded = 0,
  num = 0;

let tasks = [];

function createTask(task) {
  const t = document.createElement("li");
  t.classList.add("task", "status-" + task.status);

  const title = document.createElement("h3");
  title.textContent = task.num + 1 + "# - " + task.name + "\n" + task.date;

  t.append(title);

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
  trash.textContent = "Excluir";
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

formTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name");
  const level = document.querySelector("#lvl");
  const date = document.querySelector("#date");
  const msg = document.querySelector("#msg");

  if (name.value.trim() === "") {
    const texto = "Preencha o campo da tarefa";
    msg.hidden = false;
    msg.textContent = texto;
  } else {
    msg.hidden = true;
    msg.textContent = "";
    if (tasks.length === 0) {
      tasks.push({
        num: 0,
        name: name.value.trim(),
        date: date.value,
        lvl: level,
        status: "pend",
      });
    } else {
      tasks.push({
        num: tasks[tasks.length - 1].num + 1,
        name: name.value.trim(),
        date: date.value,
        lvl: level,
        status: "pend",
      });
    }

    msg.hidden = true;
    formTask.reset();
    name.focus();
    writeList();
  }
});

function writeList() {
  concluded = 0;
  pending = 0;

  selectTask =
    filters === "all" ? tasks : tasks.filter((task) => task.status === filters);

  selectTask.forEach((task) => {
    if (task.status === "pend") {
      pending++;
    } else {
      concluded++;
    }

    let show = tasks;
    if (filters !== "all") {
      show = tasks.filter((task) => task.status === filters);
    }

    const searchText = search.value.trim().toLowerCase();
    show = show.filter((task) => task.name.toLowerCase().includes(searchText));
    list.textContent = "";
    show.forEach((task) => {
      list.append(createTask(task));
    });
    empty.hidden = show.length > 0;
    refresh(show.length);
  });
}

function refresh() {
  concluded = 0;
  pending = 0;
  tasks.forEach((task) => {
    if (task.status === "pend") {
      pending++;
    } else {
      concluded++;
    }
  });

  listDescript.textContent =
    tasks.length +
    " tarefas na lista\n" +
    "Pendentes: " +
    pending +
    "\nConluidas: " +
    concluded;
}

writeList();
if (tasks.length === 0) {
  listDescript.textContent = "Nenhuma tarefa na lista";
}

// Estrutura para implementar BUSCA e FILTROS construida, mas não pronta
