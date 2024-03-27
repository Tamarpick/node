const { hashPassword } = require("../utils/passwordHasher.js");

const { User } = require("../models/User.js");
const { query } = require("express");

const createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		if (!user) throw new Error("User not created");
		console.log("[DATABASE]\t\tUser created", user);
		return { success: true, message: "User created", data: user };
	} catch (error) {
		throw error;
	}
};

const findUser = async (req, res) => {
	try {
		const res = await User.findById(req.query.userId);
		if (!res) throw new Error("User not found");
		return {
			success: true,
			message: "User found",
			data: res,
		};
	} catch (error) {
		throw error;
	}
};

const findUserByEmail = async (email) => {
	try {
		const res = await User.findOne({ email });
		if (!res) throw new Error("User not found");
		return {
			success: true,
			message: "User found",
			data: res,
		};
	} catch (error) {
		throw error;
	}
};

const authenticateUser = async (req, res) => {
	try {
		const result = await User.findOne({
			email: req.body.email,
			passwordHash: req.body.passwordHash,
		});
		console.log("result", result);
		if (!result) throw new Error("Invalid username or password");
		console.log("[DATABASE]\t\tUser authenticated", result);
		return {
			success: true,
			message: "User authenticated",
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: req.query.userId },
			req.body,
			{
				new: true,
			}
		);
		if (!updatedUser) throw new Error("User not found");
		else {
			console.log("[DATABASE]\t\tUser updated", updatedUser);
			return {
				success: true,
				message: "User updated",
			};
		}
		return updatedUser;
	} catch (error) {
		throw error;
	}
};

const deleteUser = async (req, res) => {
	try {
		const result = await User.findOneAndDelete({ _id: req.query.userId });
		if (result) {
			console.log("[DATABASE]\t\tUser deleted", result);
			return {
				success: true,
				message: "User deleted",
			};
		} else {
			console.log(
				"[DATABASE]\t\tDELTE REQUEST FAILED: User not found",
				req.query.userId
			);
			throw new Error("User not found");
		}
	} catch (error) {
		error.message = "bad request";
		throw error;
	}
};

const findAllUsers = async (req, res) => {
	try {
		let users = [];
		let query = {};
		if (req.query.hasTasks) {
			if (req.query.hasTasks === "1") {
				query.tasks = { $exists: true, $not: { $size: 0 } };
			} else {
				query.tasks = { $size: 0 };
			}
		}
		if (req.query.taskInfo === "1") {
			users = await User.find(query).populate("tasks");
		} else {
			users = await User.find(query);
		}

		return users;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createUser,
	findUser,
	authenticateUser,
	updateUser,
	deleteUser,
	findUserByEmail,
	findAllUsers,
};
