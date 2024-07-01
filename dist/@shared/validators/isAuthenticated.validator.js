"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const errors_1 = require("../errors");
const jwt_config_1 = require("../../configs/jwt.config");
function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.ApiError("Token is required", 401);
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        throw new errors_1.ApiError("Missing token Bearer prefix", 401);
    }
    const jwtPayload = (0, jwt_config_1.verifyToken)(token);
    res.locals.jwtPayload = jwtPayload;
    return next();
}
exports.isAuthenticated = isAuthenticated;
