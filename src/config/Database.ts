import {Sequelize} from "sequelize-typescript";
import dotenv from "dotenv";
import {Practitioner} from "../model/Practitioner";
import {PractitionerSpecialities} from "../model/PractitionerSpecialities";
import {Language} from "../model/Language";
import {Speciality} from "../model/Speciality";
import {PractitionerLanguages} from "../model/PractitionerLanguages";
import {Patient} from "../model/Patient";
import {Office} from "../model/Office";
import {PractitionerRepository} from "../repository/practitioner.repository";
import {OfficeRepository} from "../repository/office.repository";

dotenv.config();
export class Database {
    public sequelize: Sequelize | undefined;

    private DB_NAME: string = process.env.DB_NAME as string;
    private DB_USER: string = process.env.DB_USERNAME as string;
    private DB_PASSWORD: string = process.env.DB_PASSWORD as string;
    private DB_HOST: string = process.env.DB_HOST as string;


    constructor() {
        this.connect();
    }

    public async connect() {

        try {

            this.sequelize = new Sequelize({
                database: this.DB_NAME,
                username: this.DB_USER,
                password: this.DB_PASSWORD,
                host: this.DB_HOST,
                dialect: "postgres",
                models: [
                    Practitioner,
                    PractitionerSpecialities,
                    Language,
                    Speciality,
                    PractitionerLanguages,
                    Patient,
                    Office
                ],

            });
           await this.sequelize?.authenticate().then(() => {
                console.log("DB Connected successfully.!");
            });
        } catch (e) {
            console.error(e);
        }

    }
}
