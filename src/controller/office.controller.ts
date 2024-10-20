import e, {Request, Response} from "express";
import CrudController from "./crud.controller";
import {OfficeRepository} from "../repository/office.repository";
import {Office} from "../model/Office";

class OfficeController extends CrudController {

    async update(req: Request, res: Response) {
        const officeRepository = new OfficeRepository();
        await officeRepository.update(Number(req.params.id), req.body)
            .then((updatedOffice) => {
                res.status(200).send({
                    status: 'OK',
                    office: updatedOffice
                })
            })
            .catch(e => {
                OfficeController.sendError(res, e, ' Error when updating the office')
            });
    };

    async delete(req: Request, res: Response) {
        const officeRepository = new OfficeRepository();
        await officeRepository.delete(Number(req.params.id))
            .then(() => {
                res.status(200).send({
                    status: true,
                    message: "Office deleted successfully",
                })
            })
            .catch(e => {
                OfficeController.sendError(res, e, ' Error when deleting the office')
            });

    }

    async all(req: Request, res: Response) {
        const officeRepository = new OfficeRepository();
        await officeRepository.getAll()
            .then((offices: Office[]) => {
                res.status(200).send({
                    status: true,
                    offices: offices
                })
            })
            .catch(() => {
                OfficeController.sendError(res, e, 'Error while getting all offices')
            })
        ;
    };

    async create(req: Request, res: Response) {

        //create office
        const officeRepository = new OfficeRepository();
        await officeRepository.save(req.body)
            .then((newOffice: Office) => {

                res.status(201).send({
                    office: newOffice,
                    status: true
                });

            })
            .catch(e => {
                OfficeController.sendError(res, e, 'Error while creating new office')
            })
        ;
    }

    async getOne(req: Request, res: Response) {

        const officeRepository = new OfficeRepository();

        await officeRepository.getById(Number(req.params.id))
            .then((office: Office) => {
                res.status(200).send({
                    office: office,
                    status: true
                })
            })
            .catch(e => {
                OfficeController.sendError(res, e, 'Error while fetching one  new office')
            });
    }

}


export default new OfficeController()
