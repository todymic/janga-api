import {body, query} from "express-validator";

export const specialityPayload = [
    body('name')
        .notEmpty().withMessage('name is empty')
        .isString().withMessage('name must be a string'),
];
