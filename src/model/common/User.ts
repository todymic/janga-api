import {BeforeCreate, Column, DataType, DefaultScope, HasOne, Model, Sequelize, Table} from "sequelize-typescript";
import {Practitioner} from "../Practitioner";
import {before} from "node:test";
import bcrypt from "bcryptjs";
import {Office} from "../Office";
import {Language} from "../Language";
import {Speciality} from "../Speciality";

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
@DefaultScope(() => ({
    attributes: {
        exclude: [ 'password', 'createdAt', 'updatedAt']
    }
}))
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

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 8)

    }
}


export default User
