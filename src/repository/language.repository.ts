import {Sequelize} from "sequelize-typescript";
import {Language} from "../model/Language";
import {Service} from "typedi";
import {NotFoundException} from "../exceptions/NotFoundException";

export interface LanguageRepoInterface {

    save(reqLanguage: Language): Promise<Language>;

    getById(LanguageId: number): Promise<Language>;

    getAll(where?: object): Promise<Language[]>;

    update(id: number, language: Language): Promise<Language>;

    delete(languageId: number): Promise<void>;

}

@Service()
export class LanguageRepository implements LanguageRepoInterface {

    async delete(languageId: number): Promise<void> {

        await Language.findOne({where: {id: languageId}})
            .then((language: Language | null) => {

                if (!language) {
                    throw new NotFoundException(`Language ${languageId} not found`);
                }

                language.destroy();
            });
    }

    async getAll(where?: object): Promise<Language[]> {
        return await Language.findAll(where);
    }

    async getById(languageId: number): Promise<Language> {

        return await Language.findOne({where: {id: languageId}})
            .then((language: Language | null) => {

                if (!language) {
                    throw new NotFoundException(`Language ${languageId} not found`);
                }

                return language;
            });

    }

    async save(reqLanguage: Language): Promise<Language> {

        return await Language.create({
            name: reqLanguage.name,
            code: reqLanguage.code
        })
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
