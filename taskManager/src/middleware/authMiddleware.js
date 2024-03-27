const expressValidator = require("express-validator");
const {
	hashPassword,
	createToken,
	checkEncrypted,
} = require("../utils/passwordHasher.js");
const {
	createUser,
	findUser,
	authenticateUser,
	findUserByEmail,
	deleteUser,
	updateUser,
	findAllUsers,
} = require("../controllers/usersService.js");

const registerMiddleware = async (req, res, next) => {
	try {
		req.body.passwordHash = await hashPassword(req.body.password);
		const result = await createUser(req, res);
		if (!result.success)
			return res.status(404).json({ message: "User not created" });
		return res.status(200).json(result.message);
	} catch (err) {
		next(err, req, res);
	}
};

const loginMiddleware = async (req, res, next) => {
	try {
		req.body.passwordHash = await hashPassword(req.body.password);
		const result = await findUserByEmail(req.body.email);
		if (!result)
			return res.status(404).json({ message: "Invalid username or password" });
		if (!(await checkEncrypted(req.body.password, result.data.passwordHash)))
			return res.status(404).json({ message: "Invalid username or password" });
		const { passwordHash, ...data } = result.data._doc;
		data.token = createToken(result);
		return res.status(200).json(data);
	} catch (err) {
		next(err, req, res);
	}
};

const findUserMiddleware = async (req, res, next) => {
	try {
		const result = await findUser(req, res);
		if (result.success) {
			const { passwordHash, ...data } = result.data._doc;
			return res.status(200).json(data);
		}
		return res.status(404).json(result);
	} catch (err) {
		next(err, req, res);
	}
};

const deleteUserMiddleware = async (req, res, next) => {
	try {
		const deletedUser = await deleteUser(req, res);
		// console.log("deletedUser", deletedUser);
		return res.status(200).json(deletedUser);
	} catch (err) {
		next(err, req, res);
	}
};

const updateUserMiddleware = async (req, res, next) => {
	try {
		if (req.body.password) {
			req.body.passwordHash = await hashPassword(req.body.password);
		}
		const updatedUser = await updateUser(req, res);
		return res.status(200).json(updatedUser);
	} catch (err) {
		next(err, req, res);
	}
};

const findAllUsersMiddleware = async (req, res, next) => {
	try {
		const users = await findAllUsers(req, res);
		return res.status(200).json(users);
	} catch (err) {
		next(err, req, res);
	}
};

module.exports = {
	loginMiddleware,
	registerMiddleware,
	findUserMiddleware,
	deleteUserMiddleware,
	updateUserMiddleware,
	findAllUsersMiddleware,
};
