
import {NotFoundException} from "../exceptions/NotFoundException";
import {Service} from "typedi";
import {BaseRepository} from "./base.repository";
import {Speciality} from "../model/speciality";

interface SpecialityRepoInterface {
    save(reqSpeciality: Speciality): Promise<Speciality>;

    getById(specialityId: number): Promise<Speciality>;

    getAll(where?: object): Promise<Speciality[]>;

    update(id: number, speciality: Speciality): Promise<Speciality>;

    delete(specialityId: number): Promise<void>;
}

@Service()
export class SpecialityRepository extends BaseRepository<Speciality> {

    constructor() {
        super(Speciality);
    }

    async save(reqSpeciality: Speciality): Promise<Speciality> {

        let newSpeciality = new Speciality();
        newSpeciality.name = reqSpeciality.name

        return newSpeciality.save();

    }

    async update(id: number, speciality: Speciality): Promise<Speciality> {

        return Speciality.findByPk(id)
            .then((existSpeciality) => {

                if (!existSpeciality) {
                    throw new NotFoundException(`Speciality with id ${id} not found`);
                }

                existSpeciality.name = speciality.name
                return existSpeciality.save({
                    validate: false
                })

            })

    }
}
