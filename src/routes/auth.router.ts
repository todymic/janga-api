import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import BoAuthController from "../controller/auth/bo-auth.controller";
import {loginPayload, registerPayload} from "../validator/auth.validator";

class AuthRouter extends BaseRouter {
    routes() {

        this.router.post('/bo/login', validation(loginPayload), BoAuthController.login)
        this.router.post('/bo/register', validation(registerPayload), BoAuthController.register)

    }
}

export default new AuthRouter().router;
