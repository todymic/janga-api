import {Sequelize} from "sequelize-typescript";
import {Language} from "../model/Language";
import {Service} from "typedi";
import {NotFoundException} from "../exceptions/NotFoundException";
import {BaseRepository} from "./base.repository";



@Service()
export class LanguageRepository extends BaseRepository<Language> {

    constructor() {
        super(Language);
    }

    async save(reqLanguage: Language): Promise<Language> {

        const language = {
            name: reqLanguage.name,
            code: reqLanguage.code
        }

        return super.save(language as Language)
    }

    async update(id: number, language: Language): Promise<Language> {

        return await Language.findOne({where: {id: id}})
            .then((updatedLanguage: Language | null) => {

                if (!updatedLanguage) {
                    throw new NotFoundException(`Language ${id} not found`);
                }

                updatedLanguage.name = language.name;
                updatedLanguage.code = language.code;

                return updatedLanguage.save();
            });
    }
}
