const { body } = require("express-validator");

exports.categoryValidator = [
	body("name").isLength({ min: 3 }).withMessage("Provide a valid name").bail(),
];
