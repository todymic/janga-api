import {User} from "../model/common/User";
import {BaseRepository} from "./base.repository";
import {NotFoundException} from "../exceptions/NotFoundException";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async save(reqUser: User): Promise<User> {

        const user = {
            firstname: reqUser.firstname,
            lastname: reqUser.lastname,
            email: reqUser.email,
            description: reqUser?.description,
            active: reqUser.active,
        }
        return await super.save(user as User);
    }

    async update(id: number, newData: User): Promise<User> {

       return super.getById(id)
           .then((user: User| null) => {

            if(!user) {
                throw new NotFoundException();
            }
            user.firstname = newData.firstname;
            user.lastname = newData.lastname;
            user.email = newData.email;
            user.description = newData.description;
            user.active = newData.active;

            return user.save();
        })
    }

}
