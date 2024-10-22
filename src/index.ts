import express, {Application} from "express";
import dotenv from "dotenv";
import {Database} from "./config/Database";
import bodyParser from "body-parser";

import cors from "cors";
import {Routes} from "./routes";
import {Office} from "./model/Office";
import {Language} from "./model/Language";
import {Speciality} from "./model/Speciality";
import {faker} from "@faker-js/faker/locale/ar";
import {createLanguages, createOffices, createSpecialities} from "./fixtures/practitioner";
import {Faker} from "@faker-js/faker";
import {Practitioner} from "./model/Practitioner";
import {OfficeRepository} from "./repository/office.repository";


dotenv.config();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.connectDB();
        this.plugins();
        this.routes();
    }

    private routes(): void {
        const router = new Routes(this.app);
        router.routes();
    }

    private connectDB(): void {
        const db = new Database();
        db.sequelize?.sync({force: true})
        //     .then(() => {
        //
        //     const repoOffice = new OfficeRepository();
        //
        //     Office.create({
        //         "name": faker.person.jobTitle(),
        //         "street": faker.location.street(),
        //         "city": faker.location.city(),
        //         "zipcode": faker.location.zipCode(),
        //         "country": faker.location.country()
        //     }).then((office) => {
        //         const languages = faker.helpers.multiple(createLanguages, {
        //             count: 5,
        //         });
        //
        //         Language.bulkCreate(languages).then();
        //
        //         const specialities = faker.helpers.multiple(createSpecialities, {
        //             count: 5,
        //         });
        //
        //         Speciality.bulkCreate(specialities).then();
        //
        //
        //         Practitioner.create({
        //             "firstname": faker.person.firstName(),
        //             "lastname": faker.person.lastName(),
        //             "description": faker.person.bio(),
        //             "email": faker.internet.email(),
        //             "active": true,
        //             "password": "password",
        //             "officeId": office.id,
        //             "roles": ['ROLE_USER', 'ROLE _ADMIND'],
        //             "degrees": ['ROLE_USER', 'ROLE _ADMIND'],
        //             "availabilities":['sfdfsdf','fsdfsdf'],
        //             "languages": languages,
        //             specialities: specialities
        //         }).then(() => 'ok')
        //     });
        //
        //
        // })

    }

    private plugins(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }
}


const app = new App().app;
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
