import {
    addSubCategoryService, 
    getSubCategoryByIdService, 
    editSubCategoryService,
    deleteSubCategoryService,
    getAllSubCategoryService,
    getActiveSubCategoryService
} from '../services/subCategory.service.js'

export const addSubCategory = async (req, res) => await addSubCategoryService(req, res);
export const getSubCategoryById = async (req, res) => await getSubCategoryByIdService(req, res);
export const editSubCategory = async (req, res) => await editSubCategoryService(req, res);
export const deleteSubCategory = async (req, res) => await deleteSubCategoryService(req, res);
export const getAllSubCategory = async (req, res) => await getAllSubCategoryService(req, res);
export const getActiveSubCategory = async (req, res) => await getActiveSubCategoryService(req, res);