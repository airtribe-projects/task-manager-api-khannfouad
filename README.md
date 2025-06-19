//////////////// INTRODUCTION ////////////

This is a Node.js + Express.js-based Task Manager API, developed as part of the Airtribe backend assignment. It allows users to create, read, update, and delete tasks while managing task status and priority. Data is stored locally using a JSON file to simulate a database.

//////////////// FEATURES ////////////////

1 - Add a detailed task with title, description and even priority.

2 - View all tasks or choose what to by filtering through the database:
=> By Id
=> Pending Status
=> By Priority level

3 - Update your tasks (title, description, completion status, priority)

4 - Delete task by ID

5 - Built using Express JS to ensure RESTful routing.

/////////////////// TECH STACK ///////////////

1 - Node.js
2 - Express.js
3 - File System(fs) module.
4 - Tested with POSTMAN.

///////////// END POINTS FOR YOU TO USE ////////////

Method Endpoint Description

---

GET /tasks => Get all tasks
GET /tasks/:id => Get a task by ID
GET /tasks/priority/:level => Filter tasks by priority
GET /tasks?completed=true/false => (e.g., GET /tasks?completed=true)
POST /tasks => Create a new task
PUT /tasks/:id => Update task by ID
DELETE /tasks/:id => Delete task by ID

///////////////// SETUP ///////////

git clone https://github.com/khannfouad/task-manager-api.git
cd task-manager-api
npm install

/////////////////// RUN ///////////////
node index.js
The server will start on http://localhost:3000 (or your configured port)
