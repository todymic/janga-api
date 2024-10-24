import {Request, Response} from "express";
export interface AuthInterface {
    login(req: Request, res: Response): Promise<void>,
    register(req: Request, res: Response): Promise<void>
}
