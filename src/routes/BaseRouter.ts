import express, {Router} from "express";
interface IRouter {
    routes(): void;
}

abstract class BaseRouter implements IRouter {
    public router: Router

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    abstract routes(): void
}


export default BaseRouter;
