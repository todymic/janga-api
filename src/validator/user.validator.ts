import {body, query} from "express-validator";
import User from "../model/common/User";
import {AlreadyExistException} from "../exceptions/already-exist.exception";


export const userPayload = [
    body('firstname')
        .notEmpty().withMessage('firstname is empty')
        .isString().withMessage('firstname must be a string'),
    body('lastname')
        .notEmpty().withMessage('lastname is empty')
        .isString().withMessage('lastname must be a string'),
    body('email')
        .notEmpty().withMessage('email is empty')
        .isEmail().withMessage('email is invalid')
        .custom( async email => {
            await User.findOne({ where: {email: email }})
                .then((user: User | null) => {
                    if (user) {
                        throw new AlreadyExistException(`The email ${email} already exists!`);
                    }
                })
        }),
    body('password')
        .notEmpty()
        .isStrongPassword()
        .withMessage('the password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol')

];

export const userUpdatePayload = [
    body('firstname')
        .notEmpty().withMessage('firstname is empty')
        .isString().withMessage('firstname must be a string'),
    body('lastname')
        .notEmpty().withMessage('lastname is empty')
        .isString().withMessage('lastname must be a string'),
    body('email')
        .optional()
        .isEmail().withMessage('email is empty or invalid')
        .custom( async value => {
            await User.findOne({ where: {email: value }})
                .then((user: User | null) => {
                    if (user) {
                        throw new AlreadyExistException(`The email ${value} already exists!`);
                    }
                })
        }),
    body('password')
        .optional()
        .isStrongPassword()
        .withMessage('password is empty')

];
