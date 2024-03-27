const express = require("express");
const {
	registerValidator,
	loginValidator,
	userActionValidator,
} = require("../validators/userValildator.js");
const {
	loginMiddleware,
	registerMiddleware,
	findUserMiddleware,
	deleteUserMiddleware,
	updateUserMiddleware,
	findAllUsersMiddleware,
} = require("../middleware/authMiddleware.js");
const { checkAuth } = require("../utils/passwordHasher.js");
const { validationErrHandler } = require("../middleware/sharedMiddleware.js");

const userRouter = express.Router();

userRouter.get(
	"/info",
	[checkAuth, userActionValidator, validationErrHandler],
	findUserMiddleware
);

userRouter.get("/allUsers", findAllUsersMiddleware);

userRouter.post(
	"/login",
	[loginValidator, validationErrHandler],
	loginMiddleware
);

userRouter.post(
	"/register",
	[registerValidator, validationErrHandler],
	registerMiddleware
);

userRouter.delete(
	"/",
	[checkAuth, userActionValidator, validationErrHandler],
	deleteUserMiddleware
);

userRouter.patch(
	"/",
	[checkAuth, userActionValidator, validationErrHandler],
	updateUserMiddleware
);

module.exports = userRouter;
