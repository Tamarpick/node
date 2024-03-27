const express = require("express");
const { checkAuth } = require("../utils/passwordHasher");
const {
	taskCreationValidator: taskValidator,
	taskQeuryValidator,
	taskActionValidator,
} = require("../validators/taskValidator");
const {
	createTaskMiddleware,
	getTasksMiddleware,
	updateTaskMiddleware,
	deleteTaskMiddleware,
	toggleTasksMiddleware,
} = require("../middleware/tasksMiddleware");
const { validationErrHandler } = require("../middleware/sharedMiddleware");

const tasksRouter = express.Router();

tasksRouter.post(
	"/",
	[checkAuth, taskValidator, validationErrHandler],
	createTaskMiddleware
);

tasksRouter.get(
	"/",
	[checkAuth, taskQeuryValidator, validationErrHandler],
	getTasksMiddleware
);

tasksRouter.patch(
	"/",
	[checkAuth, taskActionValidator, validationErrHandler],
	updateTaskMiddleware
);

tasksRouter.delete(
	"/",
	[checkAuth, taskActionValidator, validationErrHandler],
	deleteTaskMiddleware
);

tasksRouter.patch(
	"/toggle",
	[checkAuth, taskActionValidator, validationErrHandler],
	toggleTasksMiddleware
);

module.exports = tasksRouter;
