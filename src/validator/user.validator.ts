import {body, query} from "express-validator";
import {AlreadyExistException} from "../exceptions/already-exist.exception";
import User from "../model/user";

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
