import {Column, DataType, DefaultScope, Model, Table} from "sequelize-typescript";
import User from "./user";
import {IAddress} from "./common/address.interface";

@Table({
    tableName: "patient",
})

@DefaultScope(() => ({
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class Patient extends User implements IAddress {

    @Column
    city!: string;

    @Column
    country!: string;

    @Column
    street!: string;

    @Column
    zipcode!: string;


}