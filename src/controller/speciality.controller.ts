import {Request, Response} from "express";
import {SpecialityRepository} from "../repository/speciality.repository";
import CrudController from "./crud.controller";
import {Speciality} from "../model/Speciality";

class SpecialityController extends CrudController {
    async update(req: Request, res: Response) {

        const specialityRepository = new SpecialityRepository();

        await specialityRepository.update(Number(req.params.id), req.body)
            .then((data) => {
                res.status(200).send({
                    status: true,
                    speciality: data
                })
            })
            .catch(e => {
                SpecialityController.sendError(res, e, 'Error when updating the speciality')
            })

        ;
    };

    async delete(req: Request, res: Response) {

        const specialityRepository = new SpecialityRepository();

        await specialityRepository.delete(Number(req.params.id))
            .then(() => {
                res.status(200).send({
                    status: true,
                    message: "Speciality deleted successfully",
                })
            })
            .catch(e => {
                SpecialityController.sendError(res, e, 'Error when deleting the speciality')
            });

    }

    async all(req: Request, res: Response) {

        const specialityRepository = new SpecialityRepository();

        await specialityRepository.getAll()
            .then(specialities => {
                res.status(200).send({
                    status: true,
                    specialities: specialities
                })
            })
            .catch(e => {
                SpecialityController.sendError(res, e, 'Error when fetching all specialities')
            });
    };

    async create(req: Request, res: Response) {
        //create office
        const specialityRepository = new SpecialityRepository();

        await specialityRepository.save(req.body)
            .then(newSpeciality => {
                res.status(201).send({
                    speciality: newSpeciality,
                    status: true
                });
            })
            .catch(e => {
                SpecialityController.sendError(res, e, 'Error when adding a new speciality')
            });
    }

    async getOne(req: Request, res: Response) {

        const specialityRepository = new SpecialityRepository();

        await specialityRepository.getById(Number(req.params.id))
            .then((speciality: Speciality) => {
                res.status(200).send({
                    speciality: speciality,
                    status: true
                })
            })
            .catch(e => {

                SpecialityController.sendError(res, e, 'Error when fetching a new speciality')
            });
    }

}


export default new SpecialityController()
