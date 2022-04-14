const taskRoutes = require('express').Router();
const taskController = require('../app/controller/task.controller');

taskRoutes.get("/",taskController.showTask)
taskRoutes.get("/addTaskPOST",taskController.addTaskPost)
taskRoutes.post("/addTaskPOST",taskController.addTaskPostLogic)
taskRoutes.get("/single/:id",taskController.showTaskSingle)
taskRoutes.get("/edit/:id",taskController.editTaskPost)
taskRoutes.post("/edit/:id",taskController.editTaskPostLogic)
taskRoutes.get("/del/:id",taskController.delTask)
module.exports = taskRoutes;