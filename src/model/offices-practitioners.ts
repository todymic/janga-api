import {
    BelongsToMany,
    Column,
    DataType,
    DefaultScope, ForeignKey,
    HasMany,
    HasOne,
    Model,
    Scopes,
    Table
} from "sequelize-typescript";
import {Practitioner} from "./practitioner";
import {Speciality} from "./speciality";
import {Office} from "./office";


@Table({
    tableName: 'offices_practitioners'
})

@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))

export class OfficesPractitioners extends Model  {
    @ForeignKey(() => Practitioner)
    @Column
    practitionerId!: number

    @ForeignKey(() => Office)
    @Column
    officeId!: number
}
