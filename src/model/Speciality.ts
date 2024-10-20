import {
    BeforeBulkCreate, BeforeBulkUpdate, BeforeCreate, BeforeUpdate, BeforeValidate,
    Column, DefaultScope,
    Model,
    Table, Unique
} from "sequelize-typescript";
import slugify from "slugify";

@Table({
    tableName: "speciality"
})
@DefaultScope(() => ({
    order: ['id'],
    attributes: {
        exclude: [ 'createdAt', 'updatedAt']
    }
}))
export class Speciality extends Model {

    @Column({ allowNull: false })
    name!: string;

    @Unique
    @Column({ allowNull: false})
    slug!: string;

    @BeforeValidate
    @BeforeUpdate
    static onUpdateSlugify(instance: Speciality) {
        this.slugify(instance);
    }

    private static slugify(instance: Speciality) {
        instance.slug = slugify(instance.name, {lower: true})
    }

    @BeforeBulkCreate
    @BeforeBulkUpdate
    static bulkSlugify(instances: Speciality[]) {
        instances.map((instance: any) => this.slugify(instance));
    }


}
