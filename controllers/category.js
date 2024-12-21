import { addCategoryService, getCategoryByIdService, editCategoryService, deleteCategoryService, getAllCategoryService, getActiveCategoryService } from "../services/category.service.js";

export const addCategory = async (req, res) => await addCategoryService(req, res);
export const getCategoryById = async (req, res) => await getCategoryByIdService(req, res);
export const editCategory = async (req, res) => await editCategoryService(req, res);
export const deleteCategory = async (req, res) => await deleteCategoryService(req, res);
export const getAllCategory = async (req, res) => await getAllCategoryService(req, res);
export const getActiveCategory = async (req, res) => await getActiveCategoryService(req, res);