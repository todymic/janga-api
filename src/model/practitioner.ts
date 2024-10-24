import {
    BeforeCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    DefaultScope,
    ForeignKey,
    Table
} from "sequelize-typescript";
import {Speciality} from "./speciality";
import {PractitionersSpecialities} from "./practitioners-specialities";
import {Office} from "./office";
import {User, UserInterface} from "./user";

 export interface IPractitioner extends UserInterface {
    degrees?: string[];
    specialities?: Speciality[] | null;
    office?: Office
}



@Table({
    tableName: "practitioner"
})
@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'officeId', 'createdAt', 'updatedAt']
    },
    include: [ Office, Speciality ]
}))


export class Practitioner extends User implements IPractitioner {

    @BelongsToMany(() => Speciality, () => PractitionersSpecialities)
    specialities?: Array<Speciality & { PractitionerSpecialities: PractitionersSpecialities}>;

    @Column({
        type: DataType.JSON,
    })
    availabilities!: string[]

    @Column({
        type: DataType.JSON,
    })
    degrees!: string[]

    @ForeignKey(() => Office)
    @Column
    officeId!: number

    @BelongsTo(() => Office)
    office!: Office


    @BeforeCreate
    static setRoles(instance: Practitioner) {
        instance.roles = ['ROLE_PRACTITIONER'];
    }
}
