const express = require("express");
const { checkAuth } = require("../utils/passwordHasher.js");
const { validationErrHandler } = require("../middleware/sharedMiddleware.js");
const { categoryValidator } = require("../validators/categoryValidator.js");
const {
	createCategoryMiddleware,
	removeCategoryMiddleware,
	updateCategoryMiddleware,
	getCategoryMiddleware,
	getAllCategoriesMiddleware,
} = require("../middleware/categoriesMiddleware.js");

const categoryRouter = express.Router();

categoryRouter.get("/all", [checkAuth], getAllCategoriesMiddleware);
categoryRouter.get("/", [checkAuth], getCategoryMiddleware);
categoryRouter.post(
	"/",
	[checkAuth, categoryValidator, validationErrHandler],
	createCategoryMiddleware
);

categoryRouter.delete("/", [checkAuth], removeCategoryMiddleware);
categoryRouter.patch("/", [checkAuth], updateCategoryMiddleware);

module.exports = categoryRouter;
