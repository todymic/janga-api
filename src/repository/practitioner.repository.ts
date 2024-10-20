import {Sequelize} from "sequelize-typescript";
import {Practitioner} from "../model/Practitioner";
import {Office} from "../model/Office";
import {Language} from "../model/Language";
import {Speciality} from "../model/Speciality";
import {Op} from "sequelize";
import slugify from "slugify";
import {NotFoundException} from "../exceptions/NotFoundException";
import {Service} from "typedi";

interface PractitionerRepoInterface {

    save(reqPractitioner: Practitioner): Promise<Practitioner>;

    getById(practitionerId: number): Promise<Practitioner>;

    getAll(where?: object): Promise<Practitioner[]>;

    update(practitioner: Practitioner, newData: Practitioner): Promise<Practitioner>;

    delete(practitionerId: number): Promise<void>;
}


@Service()
export class PractitionerRepository implements PractitionerRepoInterface {

    async delete(practitionerId: number): Promise<void> {

        await Practitioner.findOne({where: {id: practitionerId}})
            .then((practitioner: Practitioner | null) => {
                if (!practitioner) {
                    throw new NotFoundException(`Practitioner ${practitionerId} not found`);
                }

                practitioner.destroy();
            });
    }

    async getAll(where?: object): Promise<Practitioner[]> {

        return await Practitioner.findAll({
            include: [ Office, Speciality, Language ]
        });
    }

    async getById(practitionerId: number): Promise<Practitioner> {

        return await Practitioner
            .findByPk(practitionerId, {
                include: [ Office, Speciality, Language ]
            })
            .then((practitioner: Practitioner | null) => {

                if (!practitioner) {
                    throw new NotFoundException(`Practitioner ${practitionerId} not found`);
                }

                return practitioner;
            });


    }

    async save(reqPractitioner: Practitioner): Promise<Practitioner> {

        let newPractitioner = new Practitioner();

        newPractitioner.firstname = reqPractitioner.firstname;
        newPractitioner.lastname = reqPractitioner.lastname;
        newPractitioner.email = reqPractitioner.email;
        newPractitioner.description = reqPractitioner.description;
        newPractitioner.active = reqPractitioner.active;
        newPractitioner.officeId = reqPractitioner.officeId;


        return await newPractitioner.save();
    }

    async update(practitioner: Practitioner, newData: Practitioner): Promise<Practitioner> {

        practitioner.firstname = newData.firstname;
        practitioner.lastname = newData.lastname;
        practitioner.email = newData.email;
        practitioner.description = newData.description;
        practitioner.active = newData.active;
        practitioner.officeId = newData.officeId;

        return practitioner.update(practitioner);

    }

    async getAllByType(type: string): Promise<Practitioner[]> {
        return await Practitioner.findAll({
            include: {
                model: Speciality,
                where: {
                    slug: {[Op.eq]: type}
                }
            }
        });
    }


    async findByEmail(email: string) {
       return await Practitioner.findOne({
            where: {
                email: email
            }
        });
    }
}
