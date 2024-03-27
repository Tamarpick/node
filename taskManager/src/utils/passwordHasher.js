const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

const createToken = (obj, duration) => {
	const token = jwt.sign(
		{
			_id: obj._id,
		},
		"secret213",
		{
			expiresIn: duration || "1000y",
		}
	);
	return token;
};

const checkEncrypted = async (input, actual) => {
	return await bcrypt.compare(input, actual);
};

const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers?.authorization ?? null;
		const decoded = jwt.verify(token, "secret213");
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		next();
	} catch (err) {
		next(err, req, res);
	}
};

module.exports = {
	hashPassword,
	createToken,
	checkEncrypted,
	checkAuth,
};
