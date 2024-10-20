import {Office} from "../model/Office";
import {Service} from "typedi";
import {NotFoundException} from "../exceptions/NotFoundException";

interface OfficeRepoInterface {

    save(reqOffice: Office): Promise<Office>;

    getById(officeId: number): Promise<Office>;

    getAll(): Promise<Office[]>;

    update(id: number, office: Office): Promise<Office>;

    delete(officeId: number): Promise<void>;

}

@Service()
export class OfficeRepository implements OfficeRepoInterface {

    async delete(OfficeId: number): Promise<void> {

        await Office.findOne({where: {id: OfficeId}})
            .then((office: Office | null) => {

                if (!office) {
                    throw new NotFoundException(`Office ID ${OfficeId} not found`);
                }

                office.destroy();
            });


    }

    async getAll(where?: undefined): Promise<Office[]> {
        return await Office.findAll(where);
    }

    async getById(officeId: number): Promise<Office> {

        return await Office.findOne({where: {id: officeId}})
            .then((office: Office | null) => {

                if (!office) {
                    throw new NotFoundException(`Office ${officeId} not found`);
                }

                return office;
            });

    }

    async save(reqOffice: Office): Promise<Office> {

        return await Office.create({
            name: reqOffice.name,
            street: reqOffice.street,
            zipcode: reqOffice.zipcode,
            city: reqOffice.city,
            country: reqOffice.country,
        });

    }

    async update(id: number, office: Office): Promise<Office> {

        return await Office.findOne({where: {id: id}})
            .then((updatedOffice: Office | null) => {
                if (!updatedOffice) {
                    throw new NotFoundException(`Office ${id} not found`);
                }

                updatedOffice.name = office.name;
                updatedOffice.street = office.street;
                updatedOffice.city = office.city;
                updatedOffice.zipcode = office.zipcode;
                updatedOffice.country = office.country;

                return updatedOffice.save();
            });
    }
}
