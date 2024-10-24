import {AuthInterface} from "./auth.interface";
import {Request, Response} from "express";
import {Container, Inject} from "typedi";
import {BoAuthService, JwtAuthResponse} from "../../services/bo-auth.service";
import {BaseController} from "../BaseController";


class BoAuthController extends BaseController implements AuthInterface {

   async login(req: Request, res: Response): Promise<void> {

        const authService = Container.get(BoAuthService);

        await authService.login(req.body)
            .then((response: JwtAuthResponse) => {
                res.send(response)
            })
            .catch(e => {
                BoAuthController.sendError(res, e, 'Authentication failed!')
            });
    }

   async register(req: Request, res: Response): Promise<void> {
        const authService = Container.get(BoAuthService);

        await authService.register(req.body)
            .then((response: JwtAuthResponse) => {
                res.send(response)
            })
            .catch(e => {
                BoAuthController.sendError(res, e, 'Authentication failed!')
            });
   }

}

export default new BoAuthController();
