import {ResponseException} from "./ResponseException";

export class AlreadyExistException extends Error implements ResponseException {
    code: number = 400;
}
