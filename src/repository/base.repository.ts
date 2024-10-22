import {Model, ModelCtor} from "sequelize-typescript";
import {NotFoundException} from "../exceptions/NotFoundException";


export interface Repository<T extends Model> {

    save(entity: any, options?: any): Promise<T>;

    getById(identity: number): Promise<T>;

    getAll(where?: object): Promise<T[]>;

    update(id: number, newData: T): Promise<T>;

    delete(identity: number): Promise<void>;
}

export abstract class BaseRepository<T extends Model> implements Repository<T> {
    protected _model!: ModelCtor<T>
    protected constructor( model: ModelCtor<T>) {
        this._model = model;
    }

    async delete(identity: number): Promise<void> {

        await this._model.findByPk(identity)
            .then((model: any | null) => {

                if (!model) {
                    throw new NotFoundException(`Model ID ${identity} not found`);
                }

                model.destroy();
            });
    }

    async getAll(where?: object): Promise<T[]> {
        return await this._model.findAll(where);
    }

    async getById(identity: number): Promise<T> {
        return await this._model.findByPk(identity)
            .then((model: T | null) => {

                if (!model) {
                    throw new NotFoundException(`Model ${identity} not found`);
                }

                return model;
            });

    }

    async save(entity: any, options?: any): Promise<T> {
        return this._model.create(entity, options).then((T) => {
            if(!T) {
                throw new Error(`error on creating the model ${T}`)
            }

            return T;
        })
    }

    abstract update(id: number, newData: T): Promise<T>;


}
