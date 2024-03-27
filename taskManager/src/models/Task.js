const mongoose = require("mongoose");

const Task = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	complete: {
		type: Boolean,
		default: false,
	},
});

exports.Task = mongoose.model("Task", Task);
