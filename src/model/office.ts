import {
    BelongsTo,
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
import {OfficesPractitioners} from "./offices-practitioners";
import {Address} from "./address";


@Table({
    tableName: 'office'
})

@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))

@Scopes (() => ({
    practitioners: {
        include: [Practitioner]
    }
}))
export class Office extends Model  {

    @Column
    name!: string;

    @Column({
        type: DataType.TEXT,
    })
    information!: string;

    @Column({
        type: DataType.TEXT,
    })
    description!: string

    @BelongsToMany(() => Practitioner, () => OfficesPractitioners)
    practitioners?: Array<Practitioner & { offersPractitioners: OfficesPractitioners}>;

    @ForeignKey(() => Address)
    @Column
    addressId!: number;


    @BelongsTo(() => Address)
    address!: Address
}
