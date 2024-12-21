import { body } from 'express-validator'
export const productValidator = [
    body('p_name')
        .isString().withMessage('Product name must be a string')
        .notEmpty().withMessage('Product name is required')
        .trim(),
    body('c_id')
        .isMongoId().withMessage('category id must be a valid MongoDB ObjectId')
        .notEmpty().withMessage('Category is required'),
    body('sub_id')
        .isMongoId().withMessage('Sub category id must be a valid MongoDB ObjectId')
        .notEmpty().withMessage('Sub Category is required'),
    body('status')
        .isBoolean().withMessage('Status must be true or false')
        .notEmpty().withMessage('Status is required'),
];