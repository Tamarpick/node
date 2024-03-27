const {
	createCategory,
	updateCategory,
	removeCategory,
	getCategory,
	getAllCategories,
} = require("../controllers/categoriesService.js");

const createCategoryMiddleware = async (req, res, next) => {
	try {
		const result = await createCategory(req, res);
		if (result.success) return res.status(200).json(result);
	} catch (err) {
		next(err, req, res);
	}
};

const updateCategoryMiddleware = async (req, res, next) => {
	try {
		if (!req.query.categoryId) throw new Error("categoryId is required");
		const result = await updateCategory(req, res);
		if (result.success) return res.status(200).json(result);
	} catch (err) {
		next(err, req, res);
	}
};

const removeCategoryMiddleware = async (req, res, next) => {
	try {
		if (!req.query.categoryId) throw new Error("categoryId is required");
		const result = await removeCategory(req, res);
		if (result.success) return res.status(200).json(result);
	} catch (err) {
		next(err, req, res);
	}
};

const getCategoryMiddleware = async (req, res, next) => {
	try {
		if (!req.query.categoryId) throw new Error("categoryId is required");
		const result = await getCategory(req, res);
		if (result.success) return res.status(200).json(result);
	} catch (err) {
		next(err, req, res);
	}
};

const getAllCategoriesMiddleware = async (req, res, next) => {
	try {
		const allCategories = await getAllCategories(req, res);
		return res.status(200).json(allCategories);
	} catch (err) {
		next(err, req, res);
	}
};

module.exports = {
	updateCategoryMiddleware,
	removeCategoryMiddleware,
	createCategoryMiddleware,
	getAllCategoriesMiddleware,
	getCategoryMiddleware,
};
