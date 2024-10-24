import {Inject, Service} from "typedi";
import {UserRequest, UserService} from "./user.service";
import User from "../model/common/User";
import jwt, {Secret, JwtPayload} from 'jsonwebtoken';
import {UserRepository} from "../repository/user.repository";
import {NotFoundException} from "../exceptions/NotFoundException";
import bcrypt from "bcryptjs";

export const SECRET_KEY: Secret = '0043e385bb8c9cd1bc9be6680530a5a1a6d385b60e265a70d829f2d2011bd60f';

export interface Credential {
    email: string,
    password: string,
}

export interface JwtAuthResponse {
    user: User,
    token: string
}

@Service()
export class BoAuthService {

    @Inject()
    private userService!: UserService;

    @Inject()
    private userRepository!: UserRepository;

    async login(credential: Credential): Promise<JwtAuthResponse> {

        const {email, password} = credential;

        return this.userRepository.login(email, password)
            .then((user) => {
                if (!user) {
                    throw new NotFoundException("Authentication failed");
                }

                //compare password
                const isMatch = bcrypt.compare(password, user.password);

                if (!isMatch) {
                    throw new NotFoundException("Authentication failed");
                }

                // create token
                const token = jwt.sign({_id: user.id.toString(), email: user.email}, SECRET_KEY, {
                    expiresIn: '2h'
                })

                return {user: user, token: token};
            })

    }

    async register(dataRequest: UserRequest): Promise<JwtAuthResponse> {

        return this.userService.createUser(dataRequest)
            .then((user: User) => {
                // create token
                const token = jwt.sign({ _id: user.id.toString(), email: user.email, roles: user.roles }, SECRET_KEY, {
                    expiresIn: '2h'
                })

                return {user: user, token: token};
            });

    }

}
