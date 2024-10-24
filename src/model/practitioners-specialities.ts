import {Column, DefaultScope, ForeignKey, Model, Table} from "sequelize-typescript";
import {Practitioner} from "./practitioner";
import {Speciality} from "./speciality";

@Table({
    tableName: 'practitioners_specialities'
})
@DefaultScope(() => ({
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class PractitionersSpecialities extends Model<PractitionersSpecialities> {

    @ForeignKey(() => Practitioner)
    @Column
    practitionerId!: number

    @ForeignKey(() => Speciality)
    @Column
    specialityId!: number
}
