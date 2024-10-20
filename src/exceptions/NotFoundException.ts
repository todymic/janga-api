import {ResponseException} from "./ResponseException";

export class NotFoundException extends Error implements ResponseException {
    code: number = 404;
}
