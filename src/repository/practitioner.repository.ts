import {IPractitioner, Practitioner} from "../model/Practitioner";
import {Office} from "../model/Office";
import {Language} from "../model/Language";
import {Speciality} from "../model/Speciality";
import {Op} from "sequelize";
import {NotFoundException} from "../exceptions/NotFoundException";
import {Service} from "typedi";
import {BaseRepository} from "./base.repository";
import User from "../model/common/User";
import {PractitionerRequest} from "../services/practitioner.service";

interface PractitionerRepoInterface {

    save(reqPractitioner: Practitioner): Promise<Practitioner>;

    getById(practitionerId: number): Promise<Practitioner>;

    getAll(where?: object): Promise<Practitioner[]>;

    update(practitioner: Practitioner, newData: Practitioner): Promise<Practitioner>;

    delete(practitionerId: number): Promise<void>;
}


@Service()
export class PractitionerRepository extends BaseRepository<Practitioner> {

    constructor() {
        super(Practitioner);
    }

    async save(reqPractitioner: PractitionerRequest): Promise<Practitioner> {

        let newPractitioner = {
            firstname: reqPractitioner.firstname,
            lastname: reqPractitioner.lastname,
            email: reqPractitioner.email,
            description: reqPractitioner.description,
            password: reqPractitioner.password,
            roles: ['ROLE_PRACTITIONER'],
            active: true,
            degrees: reqPractitioner.degrees,
            availabilities: reqPractitioner.availabilities,
            officeId: reqPractitioner.officeId,
        };


        return await Practitioner.create(newPractitioner);

    }

    override async  update(id: number, newData: any): Promise<Practitioner> {

        return await super.getById(id)
            .then((practitioner: Practitioner | null) => {

                if (!practitioner) {
                    throw new NotFoundException(`Practitioner ${id} not found `);
                }

                practitioner.degrees = newData.degrees;
                practitioner.availabilities = newData.availabilities;
                practitioner.firstname = newData.firstname;
                practitioner.lastname = newData.lastname;
                practitioner.description = newData.description;

                if(newData.password) {
                    practitioner.password = newData.password;
                }

                if(newData.email) {
                    practitioner.email = newData.email;
                }

                practitioner.password = newData.password;
                practitioner.roles = ['ROLE_PRACTITIONER'];
                practitioner.active = true;
                return practitioner.save();
            })

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
