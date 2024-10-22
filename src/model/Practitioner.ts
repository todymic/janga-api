import {
    BeforeBulkCreate, BeforeCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    DefaultScope,
    ForeignKey,
    HasMany, HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {Language} from "./Language";
import {Speciality} from "./Speciality";
import {PractitionerSpecialities} from "./PractitionerSpecialities";
import {PractitionerLanguages} from "./PractitionerLanguages";
import {Office} from "./Office";
import {UserInterface} from "./common/User";

 export interface IPractitioner extends UserInterface {
    degrees?: string[];
    languages?: Language[] | null;
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
    include: [ Office, Language, Speciality ]
}))


export class Practitioner extends Model implements IPractitioner {

    @Column({allowNull: false})
    firstname!: string;

    @Column({allowNull: false})
    lastname!: string;

    @Column({allowNull: false, unique: true})
    email!: string;

    @Column({allowNull: false, defaultValue: '0'})
    active!: boolean;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description!: string;

    @Column({allowNull: false})
    password!: string;


    @Column({
        type: DataType.JSON,
        allowNull: false,
        defaultValue: ['ROLE_PRACTITIONER']
    })
    roles!: string[];

    @BelongsToMany(() => Language, () => PractitionerLanguages)
    languages?: Array<Language & {PractitionerLanguages: PractitionerLanguages}>;

    @BelongsToMany(() => Speciality, () => PractitionerSpecialities)
    specialities?: Array<Speciality & { PractitionerSpecialities: PractitionerSpecialities}>;

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
}
