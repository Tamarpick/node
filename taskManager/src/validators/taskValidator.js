const { body, query } = require("express-validator");

exports.taskCreationValidator = [
	body("userId").isMongoId().withMessage("Invalid user id").bail(),
	body("categoryId").isMongoId().withMessage("Invalid category id").bail(),
	body("title")
		.isLength({ min: 3 })
		.withMessage("Task name must be at least 3 characters long")
		.bail(),
	body("description")
		.isLength({ min: 3 })
		.withMessage("Task description must be at least 3 characters long")
		.bail(),
	body("dueDate").isISO8601().withMessage("Invalid date format").bail(),
];

exports.taskQeuryValidator = [
	query("userId").isMongoId().withMessage("Invalid user id").bail(),
];

exports.taskActionValidator = [
	query("userId").isMongoId().withMessage("Invalid user id").bail(),
	query("taskId").isMongoId().withMessage("Invalid task id").bail(),
];
