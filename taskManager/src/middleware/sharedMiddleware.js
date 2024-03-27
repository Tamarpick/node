const { validationResult } = require("express-validator");

const validationErrHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw errors;
	} else next();
};

module.exports = { validationErrHandler };
