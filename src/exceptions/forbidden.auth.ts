import {ResponseException} from "./ResponseException";

export class ForbiddenAuthenticationException extends Error implements ResponseException {
    code: number = 403;
    message: string = "Access forbidden";
}
