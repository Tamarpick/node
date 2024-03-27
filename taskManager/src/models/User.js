const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{
		timestamps: true,
	}
);

exports.User = mongoose.model("User", User);
