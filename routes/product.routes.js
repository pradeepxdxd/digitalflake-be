import express from 'express'
import auth from '../middlewares/auth.js';
import { handleValidationErrors } from '../middlewares/handleValidateError.js';
import { productValidator } from '../validations/product.js';
import { addProduct, getProductById, editProduct, deleteProduct, getAllProduct } from '../controllers/product.js';

const route = express.Router();

route.post(
    '/',
    auth,
    productValidator,
    handleValidationErrors,
    addProduct
);
route.get(
    "/",
    auth,
    getAllProduct
)
route.get(
    "/:id",
    auth,
    getProductById
)
route.patch(
    '/:id',
    auth,
    productValidator,
    handleValidationErrors,
    editProduct
)
route.delete(
    '/:id',
    auth,
    deleteProduct
)

export default route;