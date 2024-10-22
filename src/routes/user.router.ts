import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import {userPayload, userUpdatePayload} from "../validator/user.validator";
import UserController from "../controller/bo/user.controller";
import {base} from "@faker-js/faker";
import {body} from "express-validator";

class UserRouter extends BaseRouter {
    routes() {

        this.router.post('/new', validation(userPayload), UserController.create)
        this.router.get('/', UserController.all)
        this.router.get('/:id', UserController.getOne)
        this.router.put('/:id', validation(userUpdatePayload), UserController.update)
        this.router.delete('/:id', UserController.delete)

    }
}

export default new UserRouter().router;
