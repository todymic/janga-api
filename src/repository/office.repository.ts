
import {Service} from "typedi";
import {NotFoundException} from "../exceptions/NotFoundException";
import {BaseRepository} from "./base.repository";
import {Model} from "sequelize-typescript";
import {Office} from "../model/office";

@Service()
export class OfficeRepository extends BaseRepository<Office> {

    constructor() {
        super(Office);
    }


    async save(reqOffice: Office): Promise<Office> {

        const office = {
            name: reqOffice.name
        };

        return await super.save(office as Office);

    }

    async update(id: number, office: Office): Promise<Office> {

        return await Office.findOne({where: {id: id}})
            .then((updatedOffice: Office | null) => {
                if (!updatedOffice) {
                    throw new NotFoundException(`Office ${id} not found`);
                }

                updatedOffice.name = office.name;

                return updatedOffice.save();
            });
    }
}
