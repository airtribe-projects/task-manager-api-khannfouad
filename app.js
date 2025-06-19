const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

const taskPath = path.join(__dirname, "task.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function readTasks() {
  const data = fs.readFileSync(taskPath, "utf-8");
  const jsonData = JSON.parse(data);
  return jsonData;
}

function writeTasks(data) {
  fs.writeFileSync(taskPath, JSON.stringify(data));
}

// function migration() {
//   const tasks = readTasks();
//   let taskArray = tasks.tasks;

//   taskArray = taskArray.map((task) => ({
//     ...task,
//     priority: task.priority || "medium",
//   }));

//   writeTasks({ tasks: taskArray });
// }  used for adding priority to the existing data

app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  const isCompleted = req.query.completed === "true";

  if (!tasks) {
    res.status(500).json({ response: "Sorry error loading your data" });
  }

  if (isCompleted) {
    const filteredTasks = tasks.tasks.filter(
      (task) => task.completed === isCompleted
    );
    res.json({ tasks: filteredTasks });
  }

  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.tasks.find((t) => t.id == req.params.id);
  if (!task) {
    res.status(404).json({ response: "Your given task is not found. :(" });
  } else {
    res.json(task);
  }
});

app.get("/tasks/priority/:level", (req, res) => {
  const tasks = readTasks();
  const priorityGiven = req.params.level;

  if (
    priorityGiven != "low" &&
    priorityGiven != "medium" &&
    priorityGiven != "high"
  ) {
    res
      .status(400)
      .json({ response: "Recieved a bad request on priority front :( " });
  } else {
    let priorityFilter = tasks.tasks.filter(
      (task) => task.priority == priorityGiven
    );

    res.json({ tasks: priorityFilter });
  }
});

app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).json({
      response: "You have send incomplete information kindly re-evaluate",
    });
  }

  console.log("data sent from postman on ", Date.now());

  const tasks = readTasks();

  const task = {
    id: tasks.tasks.length + 1,
    title,
    description,
    completed,
  };

  tasks.tasks.push(task);
  writeTasks(tasks);
  res.status(200).json({ task, response: "Task is added successfully" });
});

app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.tasks.find((t) => t.id == req.params.id);

  if (!task) {
    res.status(404).json({ response: "Please enter valid Task :) " });
  }

  const { title, description, completed } = req.body;
  console.log(title, description);
  if (title != undefined) {
    task.title = title;
  }
  if (description != undefined) {
    task.description = description;
  }
  if (completed != undefined) {
    task.completed = completed;
  }

  writeTasks(tasks);
  res
    .status(200)
    .json({ task, response: "Task has been updated successfully !" });
});

app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();

  const findTaskIndex = tasks.tasks.findIndex((t) => t.id == req.params.id);
  if (findTaskIndex == -1) {
    res.status(404).json({ response: "Please enter valid task id :( " });
  }

  const deletedTask = tasks.tasks.splice(findTaskIndex, 1);
  writeTasks(tasks);

  res
    .status(200)
    .json({ deletedTask, response: "Task deleted successfully !" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
