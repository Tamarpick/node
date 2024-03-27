const { Task } = require("../models/Task.js");
const { User } = require("../models/User.js");

const createTask = async (req, res) => {
	try {
		const taskCreation = new Task(req.body);
		console.log("taskCreation", taskCreation);
		const result = await taskCreation.save();
		const userId = req.query.userId;
		const userUpdate = await User.findByIdAndUpdate(
			userId,
			{
				$push: { tasks: taskCreation._id },
			},
			{ new: true }
		);
		if (!taskCreation || !userUpdate) throw new Error("Task not created");
		return {
			succcess: true,
			message: "Task created",
		};
	} catch (error) {
		throw error;
	}
};

const getTasks = async (req, res) => {
	try {
		const query = {};
		if (req.query.userId) {
			query.userId = req.query.userId;
		}
		if (req.query.categoryId) {
			query.categoryId = req.query.categoryId;
		}
		if (req.query.title) {
			query.title = { $regex: req.query.title, $options: "i" };
		}
		if (req.query.description) {
			query.description = { $regex: req.query.description, $options: "i" };
		}
		if (req.query.dueDate) {
			query.dueDate = { $gte: new Date(req.query.dueDate) };
		}
		if (req.query.complete) {
			query.complete = req.query.complete === "true";
		}
		if (req.query.taskId) {
			query._id = req.query.taskId;
		}
		console.log("query", query);
		const result = await Task.find(query);
		if (!result) throw new Error("Tasks not found");
		return {
			success: true,
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

const updateTask = async (req, res) => {
	try {
		const task = await Task.findById(req.query.taskId);
		if (!task) {
			return {
				success: false,
				message: "Task not found2",
			};
		}
		console.log("task.userId", task.userId);
		console.log("req.query.userId", req.query.userId);
		if (task.userId.toString() !== req.query.userId) {
			return {
				success: false,
				message: "You can only update your own tasks",
			};
		}
		const result = await Task.findByIdAndUpdate(req.query.taskId, req.body, {
			new: true,
		});
		res.status(200).json(result);
	} catch (error) {
		throw error;
	}
};

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(req.query.taskId);
		if (!task) {
			return {
				success: false,
				message: "Task not found",
			};
		}
		if (task.userId.toString() !== req.query.userId) {
			return {
				success: false,
				message: "You can only delete your own tasks",
			};
		}
		const result = await Task.findByIdAndDelete(req.query.taskId);
		await User.findByIdAndUpdate(req.query.userId, {
			$pull: { tasks: req.query.taskId },
		});
		return {
			success: true,
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

const toggleTask = async (req, res) => {
	try {
		const task = await Task.findById(req.query.taskId);
		if (!task) {
			return {
				success: false,
				message: "Task not found",
			};
		}
		if (task.userId.toString() !== req.query.userId) {
			return {
				success: false,
				message: "You can only change your own tasks",
			};
		}
		const result = await Task.findByIdAndUpdate(
			req.query.taskId,
			{
				complete: !req.body.complete,
			},
			{
				new: true,
			}
		);

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
	toggleTask,
};
