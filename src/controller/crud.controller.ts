import {Request, Response} from "express";
import {BaseController} from "./BaseController";

interface ICrudController {
    create(req: Request, res: Response): void
    getOne(req: Request, res: Response): void
    update(req: Request, res: Response): void
    delete(req: Request, res: Response): void
    all(req: Request, res: Response): void
}
abstract class CrudController extends BaseController implements ICrudController {
    abstract all(req: Request, res: Response): void

    abstract create(req: Request, res: Response): void

    abstract delete(req: Request, res: Response): void

    abstract getOne(req: Request, res: Response): void

    abstract update(req: Request, res: Response): void
}

export default CrudController;
