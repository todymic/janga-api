import {Inject, Service} from "typedi";
import {UserRepository} from "../repository/user.repository";
import User from "../model/common/User";


export interface UserRequest {
    firstname: string,
    lastname: string,
    description: string,
    email?: string,
    active: boolean,
    password?: string
}

@Service()
export class UserService {

    @Inject()
    private userRepository!: UserRepository

    async createUser(userRequest: UserRequest): Promise<User> {
        return this.userRepository.save(userRequest)
            .then((user: User) => {
                return this.userRepository.getById(user.id)
        });
    }


}
