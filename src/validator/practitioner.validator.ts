import {body, query} from "express-validator";


export const practitionerPayload = [
    body('firstname')
        .notEmpty().withMessage('firstname is empty')
        .isString().withMessage('firstname must be a string'),
    body('lastname')
        .notEmpty().withMessage('lastname is empty')
        .isString().withMessage('lastname must be a string'),
    body('email')
        .notEmpty()
        .isEmail().withMessage('email is empty or invalid'),
    body('password')
        .notEmpty()
        .withMessage('password is empty'),
    body('officeId')
        .optional()
        .isNumeric().withMessage('office Id must be a number'),
    body('specialities')
        .notEmpty().withMessage('specialities is required')
        .isArray().withMessage('specialities must be an array of IDs'),
    body('languages')
        .notEmpty().withMessage('languages is required')
        .isArray().withMessage('languages must be an array of IDs'),

];
