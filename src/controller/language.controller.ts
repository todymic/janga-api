import {Request, Response} from "express";
import {LanguageRepository} from "../repository/language.repository";
import CrudController from "./crud.controller";
import {Language} from "../model/Language";

class LanguageController extends CrudController {
    async update(req: Request, res: Response) {

        const languageRepository = new LanguageRepository();

        await languageRepository.update(Number(req.params.id), req.body)
            .then((language) => {
                res.status(200).send({
                    status: true,
                    language: language
                })
            })
            .catch(e => {
                LanguageController.sendError(res, e, 'Error when updating the language')
            })

        ;
    };

    async delete(req: Request, res: Response) {

        const languageRepository = new LanguageRepository();

        await languageRepository.delete(Number(req.params.id))
            .then(() => {
                res.status(200).send({
                    status: true,
                    message: "Language deleted successfully",
                })
            })
            .catch(e => {
                LanguageController.sendError(res, e, 'Error when deleting the language')
            });

    }

    async all(req: Request, res: Response) {

        const languageRepository = new LanguageRepository();

        await languageRepository.getAll()
            .then(languages => {
                res.status(200).send({
                    status: true,
                    languages: languages
                })
            })
            .catch(e => {
                LanguageController.sendError(res, e, 'Error when fetching all languages')
            });
    };

    async create(req: Request, res: Response) {
        //create office
        const languageRepository = new LanguageRepository();

        await languageRepository.save(req.body)
            .then(newLanguage => {
                res.status(201).send({
                    language: newLanguage,
                    status: true
                });
            })
            .catch(e => {
                LanguageController.sendError(res, e, 'Error when adding a new language')
            });
    }

    async getOne(req: Request, res: Response) {

        const languageRepository = new LanguageRepository();

        await languageRepository.getById(Number(req.params.id))
            .then((language: Language) => {
                res.status(200).send({
                    language: language,
                    status: true
                })
            })
            .catch(e => {

                LanguageController.sendError(res, e, 'Error when fetching a new language')
            });
    }

}


export default new LanguageController()
