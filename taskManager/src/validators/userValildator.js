const { body, query } = require("express-validator");

exports.registerValidator = [
	body("email").isEmail().withMessage("Invalid email address").bail(),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.bail(),
	body("fullName")
		.isLength({ min: 3 })
		.withMessage("Full name must be at least 3 characters long")
		.bail(),
];

exports.loginValidator = [
	body("email").isEmail().withMessage("Invalid email address").bail(),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.bail(),
];

exports.userActionValidator = [
	query("userId").isMongoId().withMessage("Invalid user id").bail(),
];
