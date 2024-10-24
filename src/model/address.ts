import {Column, DataType, DefaultScope, ForeignKey, HasMany, HasOne, Model, Scopes, Table} from "sequelize-typescript";
import {IAddress} from "./common/address.interface";
import {Office} from "./office";

@Table({
    tableName: 'address'
})

@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))

export class Address extends Model implements IAddress {

    @Column
    street!: string;

    @Column
    city!: string;

    @Column
    zipcode!: string;

    @Column
    country!: string;

    @Column
    longitude!: string;

    @Column
    latitude!: string;

    @HasOne(() => Office, 'addressId')
    office!: Office;

}
