import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import {userUpdatePayload} from "../validator/user.validator";
import UserController from "../controller/bo/user.controller";
import {registerPayload} from "../validator/auth.validator";
import auth from "../middleware/auth";

class UserRouter extends BaseRouter {
    routes() {

        this.router.post('/new', auth, validation(registerPayload), UserController.create)
        this.router.get('/', auth, UserController.all)
        this.router.get('/:id', auth, UserController.getOne)
        this.router.put('/:id', auth, validation(userUpdatePayload), UserController.update)
        this.router.delete('/:id', auth, UserController.delete)

    }
}

export default new UserRouter().router;
