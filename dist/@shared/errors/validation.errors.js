"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyValidationError = void 0;
const zod_1 = require("zod");
class BodyValidationError extends zod_1.ZodError {
    error;
    statusCode;
    constructor(error, statusCode = 400) {
        super(error.errors);
        this.error = error;
        this.statusCode = statusCode;
    }
}
exports.BodyValidationError = BodyValidationError;
