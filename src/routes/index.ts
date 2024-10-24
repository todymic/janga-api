import express, {Application, Express, Router} from "express";
import PractitionerRouter from "./practitioner.router";
import SpecialityRouter from "./speciality.router";
import OfficeRouter from "./office.router";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../docs/swagger_output.json";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";

export class Routes {
    constructor(private app: Application) {}
    routes(): void {

        // front routes
        this.app.use('/api/practitioners', PractitionerRouter);
        this.app.use('/api/specialities', SpecialityRouter);
        this.app.use('/api/offices', OfficeRouter);
        this.app.use('/api/users', UserRouter);

        //auth routes
        this.app.use('/api/auth', AuthRouter);

        // docs API
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    }
}
