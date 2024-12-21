import express from 'express'
import auth from '../middlewares/auth.js';
import {handleValidationErrors} from '../middlewares/handleValidateError.js';
import { addCategory, getCategoryById, editCategory, deleteCategory, getAllCategory, getActiveCategory } from '../controllers/category.js';
import { categoryValidator } from '../validations/category.js';

const route = express.Router();

route.get('/active-category', auth, getActiveCategory)
route.post(
    '/',
    auth,
    categoryValidator,
    handleValidationErrors,
    addCategory
);
route.get(
    '/',
    auth,
    getAllCategory
)
route.get(
    "/:id",
    auth,
    getCategoryById
)
route.patch(
    '/:id',
    auth,
    categoryValidator,
    handleValidationErrors,
    editCategory
)
route.delete(
    '/:id',
    auth,
    deleteCategory
)

export default route;