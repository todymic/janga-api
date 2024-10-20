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
    body('officeId')
        .optional()
        .isNumeric().withMessage('office Id must be a number'),
    // body('office.name')
    //     .notEmpty()
    //     .isString().withMessage('office name is required'),
    // body('office.street')
    //     .notEmpty().withMessage('office street is required')
    //     .isString().withMessage('office street must be a string'),
    // body('office.city')
    //     .notEmpty().withMessage('office city is required')
    //     .isString().withMessage('office city must be a string'),
    // body('office.zipcode')
    //     .notEmpty().withMessage('office zipcode is required')
    //     .isString().withMessage('office zipcode must be a string'),
    // body('office.country')
    //     .notEmpty()
    //     .isString().withMessage('office country  is required'),
    body('specialities')
        .notEmpty().withMessage('specialities is required')
        .isArray().withMessage('specialities must be an array of IDs'),
    body('languages')
        .notEmpty().withMessage('languages is required')
        .isArray().withMessage('languages must be an array of IDs'),

];
