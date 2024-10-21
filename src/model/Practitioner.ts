import {
    BeforeBulkCreate, BeforeCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    DefaultScope,
    ForeignKey,
    HasMany,
    Model,
    Table
} from "sequelize-typescript";
import {Language} from "./Language";
import {Speciality} from "./Speciality";
import {PractitionerSpecialities} from "./PractitionerSpecialities";
import {PractitionerLanguages} from "./PractitionerLanguages";
import {Office} from "./Office";
import User, {UserInterface} from "./common/User";

 export interface IPractitioner extends UserInterface {
    degrees?: string;
    languages?: Language[] |null;
    specialities?: Speciality[] | null;
    office: Office
}

@Table({
    tableName: "practitioner"
})
@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'officeId', 'createdAt', 'updatedAt']
    }
}))
export class Practitioner extends User implements IPractitioner {

    @BelongsToMany(() => Language, () => PractitionerLanguages)
    languages?: Array<Language & {PractitionerLanguages: PractitionerLanguages}>;

    @BelongsToMany(() => Speciality, () => PractitionerSpecialities)
    specialities?: Array<Speciality & { PractitionerSpecialities: PractitionerSpecialities}>;

    @Column({
        type: DataType.JSON,
    })
    availabilities!: string

    @Column({
        type: DataType.JSON,
    })
    degrees!: string

    @ForeignKey(() => Office)
    @Column
    officeId!: number

    @BelongsTo(() => Office)
    office!: Office

}
