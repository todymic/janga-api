import express, {Application, Express, Router} from "express";
import PractitionerRouter from "./practitioner.router";
import SpecialityRouter from "./speciality.router";
import OfficeRouter from "./office.router";
import LanguageRouter from "./language.router";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../docs/swagger_output.json";
import UserRouter from "./user.router";

export class Routes {
    constructor(private app: Application) {}
    routes(): void {

        // front routes
        this.app.use('/api/practitioners', PractitionerRouter);
        this.app.use('/api/specialities', SpecialityRouter);
        this.app.use('/api/offices', OfficeRouter);
        this.app.use('/api/languages', LanguageRouter);
        this.app.use('/api/users', UserRouter);

        // docs API
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    }
}
