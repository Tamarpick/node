const { Category } = require("../models/Category.js");

const getAllCategories = async (req, res) => {
	try {
		const allCategories = await Category.find({});
		return {
			success: true,
			data: allCategories,
		};
	} catch (err) {
		throw err;
	}
};

const getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.query.categoryId);
		if (!category) throw new Error("Category not found");
		return {
			success: true,
			data: category,
		};
	} catch (err) {
		throw err;
	}
};

const createCategory = async (req, res) => {
	try {
		const result = await Category.create(req.body);
		if (!result) throw new Error("Category not created");
		console.log("[DATABSE]\t\tNew Category created", result);
		return {
			success: true,
			data: result,
		};
	} catch (err) {
		throw err;
	}
};

const updateCategory = async (req, res) => {
	try {
		const updatedCategory = await Category.findOneAndUpdate(
			{ id: req.params.id },
			{ $set: { name: req.body.name } },
			{ new: true }
		);
		if (!updatedCategory) throw new Error("Category not updated");
		return {
			success: true,
			message: "Category has been updated",
			data: updatedCategory._doc,
		};
	} catch (err) {
		throw err;
	}
};

const removeCategory = async (req, res) => {
	try {
		const deletedCategory = await Category.findOneAndDelete(
			req.query.categoryId
		);
		if (!deletedCategory) throw new Error("Category not deleted");
		console.log("[DATABSE]\t\tCategory deleted", deletedCategory);
		return { success: true, message: "Category has been deleted" };
	} catch (err) {
		throw err;
	}
};

module.exports = {
	createCategory,
	getAllCategories,
	updateCategory,
	removeCategory,
	getCategory,
};
