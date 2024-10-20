import {Column, DefaultScope, Model, Table} from "sequelize-typescript";

@Table({
    tableName: "language"
})
@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class Language extends Model {

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    code!: string;
}
