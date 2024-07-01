"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 500) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
