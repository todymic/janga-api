import {Column, DataType, Model, Sequelize} from "sequelize-typescript";

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    description?: string|null;
    active?: boolean;
    password?: string;
    roles: string[];
}

abstract class User extends Model implements UserInterface {

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
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
        defaultValue: ['ROLE_USER']
    })
    roles!: string[];
}

export default User
