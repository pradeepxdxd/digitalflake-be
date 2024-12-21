import { body } from 'express-validator'
export const categoryValidator = [
    body('c_name')
        .isString().withMessage('Category name must be a string')
        .notEmpty().withMessage('Category name is required')
        .trim(),
    body('c_image')
        .notEmpty().withMessage('Category image is required').trim(),
    body('status')
        .isBoolean().withMessage('Status must be true or false')
        .notEmpty().withMessage('Status is required'),
];