import {AuthInterface} from "./auth.interface";
import {Request, Response} from "express";
import {Inject} from "typedi";
import {PractitionerRepository} from "../../repository/practitioner.repository";
import {AuthService} from "../../services/auth.service";


export class BackAuthController implements AuthInterface {

    login(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    me(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    register(req: Request, res: Response): Promise<void> {
        return Promise.resolve(undefined);
    }


}
