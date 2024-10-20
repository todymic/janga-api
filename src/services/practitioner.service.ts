import {Inject, Service} from "typedi";
import {Practitioner} from "../model/Practitioner";
import {PractitionerRepository} from "../repository/practitioner.repository";
import {Language} from "../model/Language";
import {Speciality} from "../model/Speciality";
import {SpecialityRepository} from "../repository/speciality.repository";
import {LanguageRepository} from "../repository/language.repository";
import {Op} from "sequelize";
import {NotFoundException} from "../exceptions/NotFoundException";
import {AlreadyExistException} from "../exceptions/already-exist.exception";

export interface PractitionerRequest {
    firstname: string,
    lastname: string,
    description: string,
    email: string,
    active: boolean,
    officeId: number,
    languages?: Array<Number>
    specialities?: Array<Number>
}

@Service()
export class PractitionerService {

    @Inject()
    private practitionerRepository!: PractitionerRepository

    @Inject()
    private languageRepository!: LanguageRepository

    @Inject()
    private specialityRepository!: SpecialityRepository

    async createPractitioner(bodyRequest: PractitionerRequest): Promise<Practitioner> {

        return this.practitionerRepository.findByEmail(bodyRequest.email)
            .then(async (existingPractitioner: Practitioner | null) => {

                if (existingPractitioner) {
                    throw new AlreadyExistException(`The email ${bodyRequest.email} already exists!`);
                }
                return this.practitionerRepository.save(bodyRequest as Practitioner)
                    .then((newPractitioner) => {

                        return this.setRelations(bodyRequest, newPractitioner);

                    });
            })
            ;
    }

    async updatePractitioner(id: number, bodyRequest: PractitionerRequest): Promise<Practitioner> {

        return this.practitionerRepository.getById(id)
            .then(async (practitioner: Practitioner | null) => {

                if (!practitioner) {
                    throw new NotFoundException(`Practitioner ID ${id} is not found`);
                }

                return await this.practitionerRepository.update(practitioner, bodyRequest as Practitioner)
                    .then((practitioner) => {

                        return this.setRelations(bodyRequest, practitioner);

                    });
            })
    }

     private async setRelations(bodyRequest: PractitionerRequest, practitioner: Practitioner): Promise<Practitioner>
     {
        return await this.languageRepository
            .getAll({
                where: {
                    id: {
                        [Op.or]: [bodyRequest.languages]
                    }
                }
            })
            .then(async (languages: Language[]) => {

                return practitioner.$set('languages', languages)
                    .then(async() => {
                        // get specialities
                        return this.specialityRepository
                            .getAll({
                                where: {
                                    id: {
                                        [Op.or]: [bodyRequest.specialities]
                                    }
                                }
                            })
                            .then(async(specialities: Speciality[]) => {
                                return practitioner.$set('specialities', specialities)
                                    .then(async() => {
                                        return this.practitionerRepository.getById(practitioner.id).then();
                                    });

                            })
                    });


            });
    }
}
