import {Inject, Service} from "typedi";
import {IPractitioner, Practitioner} from "../model/Practitioner";
import {PractitionerRepository} from "../repository/practitioner.repository";
import {Language} from "../model/Language";
import {Speciality} from "../model/Speciality";
import {SpecialityRepository} from "../repository/speciality.repository";
import {LanguageRepository} from "../repository/language.repository";
import {Op} from "sequelize";
import {NotFoundException} from "../exceptions/NotFoundException";
import {AlreadyExistException} from "../exceptions/already-exist.exception";
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

        return await this.userRepository.save(userRequest);
    }


}
