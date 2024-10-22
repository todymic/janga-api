import {AuthInterface} from "./auth.interface";
import {Request, Response} from "express";


export class UserController implements AuthInterface{
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
