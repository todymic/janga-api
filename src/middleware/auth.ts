import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../services/bo-auth.service";

const auth = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const token = req.headers?.authorization?.replace('Bearer ', '');

        if(!token) {
            return res.send(403).send({
                error: "Access Forbidden"
            })
        }

        req.body.token = jwt.verify(token, SECRET_KEY);

        next();

    } catch (e) {

       res.status(401).send({
           error: 'Unauthorized'
       })

    }
}


export default auth;
