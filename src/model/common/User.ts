import {Column, DataType, HasOne, Model, Sequelize, Table} from "sequelize-typescript";
import {Practitioner} from "../Practitioner";

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    description?: string|null;
    active?: boolean;
    password?: string;
    roles: string[];
}


@Table({
    tableName: "user"
})
export class User extends Model implements UserInterface {

    @Column({allowNull: false})
    firstname!: string;

    @Column({allowNull: false})
    lastname!: string;

    @Column({allowNull: false, unique: true})
    email!: string;

    @Column({allowNull: false, defaultValue: '1'})
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
        defaultValue: ['ROLE_USER']
    })
    roles!: string[];
}


export default User
