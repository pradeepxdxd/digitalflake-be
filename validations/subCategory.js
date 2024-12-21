import { body } from 'express-validator'
export const subCategoryValidator = [
    body('sub_c_name')
        .isString().withMessage('Sub category name must be a string')
        .notEmpty().withMessage('sub category name is required')
        .trim(),
    body('sub_c_name')
        .notEmpty().withMessage('Sub category image is required').trim(),
    body('status')
        .isBoolean().withMessage('Status must be true or false')
        .notEmpty().withMessage('Status is required'),
    body('c_id')
        .isMongoId().withMessage('category id must be a valid MongoDB ObjectId')
        .notEmpty().withMessage('Category is required'),
];