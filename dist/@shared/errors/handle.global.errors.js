"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGlobalErrors = void 0;
const api_errors_1 = require("./api.errors");
const validation_errors_1 = require("./validation.errors");
const jsonwebtoken_1 = require("jsonwebtoken");
function handleGlobalErrors(error, req, res, next) {
    if (error instanceof validation_errors_1.BodyValidationError) {
        return res.status(error.statusCode).json({ errors: error.errors });
    }
    if (error instanceof api_errors_1.ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
}
exports.handleGlobalErrors = handleGlobalErrors;
