import {Sequelize} from "sequelize-typescript";
import dotenv from "dotenv";
import {Practitioner} from "../model/practitioner";
import {PractitionersSpecialities} from "../model/practitioners-specialities";
import {Speciality} from "../model/speciality";
import {Office} from "../model/office";
import User from "../model/user";
import {OfficesPractitioners} from "../model/offices-practitioners";
import {Address} from "../model/address";

dotenv.config();
export class Database {
    public sequelize: Sequelize | undefined;

    private DB_NAME: string = process.env.DB_NAME as string;
    private DB_USER: string = process.env.DB_USERNAME as string;
    private DB_PASSWORD: string = process.env.DB_PASSWORD as string;
    private DB_HOST: string = process.env.DB_HOST as string;


    constructor() {
        this.connect().then();
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
                    PractitionersSpecialities,
                    Speciality,
                    Office,
                    User,
                    OfficesPractitioners,
                    Address
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
