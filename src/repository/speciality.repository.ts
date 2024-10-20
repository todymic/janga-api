import {Speciality} from "../model/Speciality";
import {NotFoundException} from "../exceptions/NotFoundException";
import {Service} from "typedi";
import {Language} from "../model/Language";

interface SpecialityRepoInterface {
    save(reqSpeciality: Speciality): Promise<Speciality>;

    getById(specialityId: number): Promise<Speciality>;

    getAll(where?: object): Promise<Speciality[]>;

    update(id: number, speciality: Speciality): Promise<Speciality>;

    delete(specialityId: number): Promise<void>;
}

@Service()
export class SpecialityRepository implements SpecialityRepoInterface {

    async delete(specialityId: number): Promise<void> {

        const speciality = await Speciality.findOne({where: {id: specialityId}});

        if (!speciality) {
            throw new NotFoundException("Speciality not found");
        }

        await speciality.destroy();
    }

    async getAll(where?: object): Promise<Speciality[]> {
        return await Speciality.findAll(where);
    }

    async getById(specialityId: number): Promise<Speciality> {

        const speciality = await Speciality.findOne({where: {id: specialityId}});

        if (!speciality) {
            throw new NotFoundException(`Speciality ID ${specialityId} not found`);
        }

        return speciality;
    }

    async save(reqSpeciality: Speciality): Promise<Speciality> {

        let newSpeciality = {
            name: reqSpeciality.name
        }

        return await Speciality.create(newSpeciality)

    }

    async update(id: number, speciality: Speciality): Promise<Speciality> {

        return Speciality.findOne({
            where: {
                id: id
            }
        }).then((existSpeciality) => {

            if(!existSpeciality) {
                throw new NotFoundException(`Speciality with id ${id} not found`);
            }

            existSpeciality.name = speciality.name
            return existSpeciality.save({
                validate: false
            })

        })

    }
}
