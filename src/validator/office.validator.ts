import {body, param, query} from "express-validator";


export const officePayload = [
    param('id')
        .optional()
        .isNumeric()
        .withMessage('Id must be numeric'),
    body('name')
        .notEmpty()
        .isString().withMessage('office name is required'),
    body('street')
        .notEmpty().withMessage('office street is required')
        .isString().withMessage('office street must be a string'),
    body('city')
        .notEmpty().withMessage('office city is required')
        .isString().withMessage('office city must be a string'),
    body('zipcode')
        .notEmpty().withMessage('office zipcode is required')
        .isString().withMessage('office zipcode must be a string'),
    body('country')
        .notEmpty()
        .isString().withMessage('office country  is required'),

];
