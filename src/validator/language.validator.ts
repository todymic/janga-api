import {body, param, query} from "express-validator";


export const languagePayload = [
    param('id')
        .optional()
        .isNumeric(),
    body('name')
        .notEmpty().withMessage('name is empty')
        .isString().withMessage('name must be a string'),
    body('code')
        .notEmpty().withMessage('code is empty')
        .isString().withMessage('code must be a string')

];
