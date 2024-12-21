import express from 'express'
import auth from '../middlewares/auth.js';
import {handleValidationErrors} from '../middlewares/handleValidateError.js';
import { subCategoryValidator } from '../validations/subCategory.js';
import { addSubCategory, getSubCategoryById, editSubCategory, deleteSubCategory, getAllSubCategory, getActiveSubCategory } from '../controllers/subCategory.js';

const route = express.Router();

route.get('/active/sub-category', auth, getActiveSubCategory);
route.post(
    '/',
    auth,
    subCategoryValidator,
    handleValidationErrors,
    addSubCategory
);
route.get(
    "/:id",
    auth,
    getSubCategoryById
)
route.get(
    "/",
    auth,
    getAllSubCategory
)
route.patch(
    '/:id',
    auth,
    subCategoryValidator,
    handleValidationErrors,
    editSubCategory
)
route.delete(
    '/:id',
    auth,
    deleteSubCategory
)

export default route;