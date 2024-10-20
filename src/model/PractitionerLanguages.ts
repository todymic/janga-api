import {Column, DefaultScope, ForeignKey, Model, Table} from "sequelize-typescript";
import {Practitioner} from "./Practitioner";
import {Speciality} from "./Speciality";
import {Language} from "./Language";

@Table({
    tableName: 'practitioners_languages'
})
@DefaultScope(() => ({
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class PractitionerLanguages extends Model<PractitionerLanguages> {

    @ForeignKey(() => Practitioner)
    @Column
    practitionerId!: number

    @ForeignKey(() => Language)
    @Column
    LanguageId!: number
}
