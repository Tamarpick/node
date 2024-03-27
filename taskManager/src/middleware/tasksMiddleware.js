const {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
	toggleTask,
} = require("../controllers/tasksService");

const createTaskMiddleware = async (req, res, next) => {
	try {
		const newTask = await createTask(req, res);
		if (newTask.succcess) res.status(200).json(newTask);
	} catch (err) {
		next(err, req, res);
	}
};

const getTasksMiddleware = async (req, res, next) => {
	try {
		const tasks = await getTasks(req, res);
		res.status(200).json(tasks);
	} catch (err) {
		next(err, req, res);
	}
};

const updateTaskMiddleware = async (req, res, next) => {
	try {
		const updatedTask = await updateTask(req, res);
		res.status(200).json(updatedTask);
	} catch (err) {
		next(err, req, res);
	}
};

const deleteTaskMiddleware = async (req, res, next) => {
	try {
		const deletedTask = await deleteTask(req, res);
		res.status(200).json(deletedTask);
	} catch (err) {
		next(err, req, res);
	}
};

const toggleTasksMiddleware = async (req, res, next) => {
	try {
		const updatedTask = await toggleTask(req, res);
		res.status(200).json(updatedTask);
	} catch (err) {
		next(err, req, res);
	}
};

module.exports = {
	createTaskMiddleware,
	getTasksMiddleware,
	updateTaskMiddleware,
	deleteTaskMiddleware,
	toggleTasksMiddleware,
};
