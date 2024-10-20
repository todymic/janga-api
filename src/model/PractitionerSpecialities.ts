import {Column, DefaultScope, ForeignKey, Model, Table} from "sequelize-typescript";
import {Practitioner} from "./Practitioner";
import {Speciality} from "./Speciality";

@Table({
    tableName: 'practitioners_specialities'
})
@DefaultScope(() => ({
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class PractitionerSpecialities extends Model<PractitionerSpecialities> {

    @ForeignKey(() => Practitioner)
    @Column
    practitionerId!: number

    @ForeignKey(() => Speciality)
    @Column
    specialityId!: number
}
