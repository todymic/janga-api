import {Response} from "express";
import {NotFoundException} from "../exceptions/NotFoundException";

export abstract class BaseController {
    static sendError(res: Response, e: any, message: string = 'Error Server') {

        let response = {
            status: false,
            message: e.message ?? message,
            code: e.code ?? 500
        }

        res.status(response.code).send(response)
    }
}
