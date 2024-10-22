import {User} from "../model/common/User";
import {BaseRepository} from "./base.repository";
import {NotFoundException} from "../exceptions/NotFoundException";
import {Service} from "typedi";


@Service()
export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async create(reqUser: User): Promise<User> {

        const user = {
            firstname: reqUser.firstname,
            lastname: reqUser.lastname,
            email: reqUser.email,
            password: reqUser.password,
            description: reqUser?.description,
            roles: reqUser.roles,
        }
        return await super.save(user as User);
    }

    async update(id: number, newData: User): Promise<User> {

       return super.getById(id)
           .then((user: User| null) => {

            if(!user) {
                throw new NotFoundException(`User ${id} not found`);
            }

            user.firstname = newData.firstname;
            user.lastname = newData.lastname;

            if(newData.email) {
                user.email = newData.email;
            }

            if(newData.password) {
                user.password = newData.password;
            }

            user.description = newData.description;

            if(newData.active) {
                user.active = newData.active;
            }

            user.roles = newData.roles;

            return user.save();
        })
    }

}
