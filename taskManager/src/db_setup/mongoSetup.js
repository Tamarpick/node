const mongoose = require("mongoose");
const { default: User } = require("../models/User.js");
const { default: Category } = require("../models/Category.js");
const { default: Task } = require("../models/Task.js");
const connectDB = async () => {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("[DATABSE]\t\tDATABASE CONNECTED");
			console.log("[DATABSE]\t\tModels:", mongoose.models);
		})
		.catch((err) => console.log(err));
};

module.exports = connectDB;
