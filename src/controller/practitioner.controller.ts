import {Request, Response} from "express";
import {PractitionerRepository} from "../repository/practitioner.repository";
import CrudController from "./crud.controller";
import {Practitioner} from "../model/Practitioner";
import {PractitionerService} from "../services/practitioner.service";
import {Container} from "typedi";

class PractitionerController extends CrudController {

    async create(req: Request, res: Response) {
        const practitionerService = Container.get<PractitionerService>(PractitionerService);

        await practitionerService.createPractitioner(req.body)
            .then((newPractitioner: Practitioner) => {
                res.status(201).send({
                    practitioner: newPractitioner,
                    status: true
                });
            })
            .catch(e => {


                PractitionerController.sendError(res, e, 'Error when creating practitioner')
            });
    }

    async update(req: Request, res: Response) {

        const practitionerService = Container.get<PractitionerService>(PractitionerService);

        await practitionerService.updatePractitioner(Number(req.params.id), req.body)
            .then((updatedPractitioner: Practitioner) => {
                res.status(200).send({
                    status: true,
                    practitioner: updatedPractitioner
                })
            })
            .catch(e => {
                PractitionerController.sendError(res, e, 'Error when updating practitioner')
            });
    };

    async all(req: Request, res: Response) {

        const practitionerRepository = new PractitionerRepository();

        await practitionerRepository.getAll()
            .then((practitioners: Practitioner[] | null) => {
                res.status(200).send({
                    status: true,
                    practitioners: practitioners
                })
            })
            .catch(e => {
                PractitionerController.sendError(res, e, 'Error when fetching all practitioners')
            });
    };

    async getOne(req: Request, res: Response) {

        const practitionerRepository = new PractitionerRepository();

        await practitionerRepository.getById(Number(req.params.id))
            .then((practitioner: Practitioner) => {
                res.status(200).send({
                    practitioner: practitioner,
                    status: true
                })
            })
            .catch(e => {
                PractitionerController.sendError(res, e, 'Error when fetching a practitioner')
            });
    }

    async delete(req: Request, res: Response) {

        const practitionerRepository = new PractitionerRepository();

        await practitionerRepository.delete(Number(req.params.id))
            .then(() => {
                res.status(200).send({
                    status: true,
                    message: "Practitioner deleted successfully",
                })
            })
            .catch(e => {
                PractitionerController.sendError(res, e, 'Error when deleting practitioner')
            });
    }

    async getPractitionersByTypeList(req: Request, res: Response) {

        const practitionerRepository = new PractitionerRepository();

        await practitionerRepository.getAllByType(req.params.type)
            .then((practitioners: Practitioner[]) => {
                res.status(200).send({
                    practitioners: practitioners,
                    status: true
                })
            })
            .catch(e => {
                PractitionerController.sendError(res, e, 'Error when fetch practitioner by type')
            });
    }
}


export default new PractitionerController()
