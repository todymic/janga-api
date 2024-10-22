import CrudController from "../crud.controller";
import {Request, Response} from "express";
import User from "../../model/common/User";
import {UserService} from "../../services/user.service";
import {Container} from "typedi";
import {UserRepository} from "../../repository/user.repository";

class UserController extends CrudController {

    async all(req: Request, res: Response) {

        const userRepository = Container.get(UserRepository);

        await userRepository.getAll()
            .then((users: User[]) => {

                res.send({
                    status: true,
                    users: users
                })

            })
            .catch(e => {
                UserController.sendError(res, e, '');
            })

    }

    async create(req: Request, res: Response) {

        const userService = Container.get(UserService);
        return await userService.createUser(req.body)
            .then((user: User) => {

                res.status(201).send({
                    status: true,
                    user: user
                })
            })
            .catch(e => {
                UserController.sendError(res, e, 'Error when updating the user')
            })
    }

    async delete(req: Request, res: Response) {
        const userRepository = Container.get(UserRepository);
        await userRepository.delete(Number(req.params.id))
            .then(() => {
                res.status(200).send({
                    status: true,
                    message: "User deleted successfully",
                })
            })
            .catch(e => {
                UserController.sendError(res, e, ' Error when deleting the user')
            });
    }

    async getOne(req: Request, res: Response) {

        const userRepository = new UserRepository();

        await userRepository.getById(Number(req.params.id))
            .then((user: User) => {
                res.status(200).send({
                    user: user,
                    status: true
                })
            })
            .catch(e => {
                UserController.sendError(res, e, 'Error while fetching one  new user')
            });


    }

    async update(req: Request, res: Response) {

        const userRepository = new UserRepository();

        await userRepository.update(Number(req.params.id), req.body)
            .then((updatedUser) => {
                res.status(200).send({
                    status: 'OK',
                    user: updatedUser
                })
            })
            .catch(e => {
                UserController.sendError(res, e, ' Error when updating the user')
            });
    }

}

export default new UserController()
