"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("./env.config");
function generateToken(payload = {}, userId) {
    const secret = env_config_1.parsedEnv.JWT_SECRET;
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: "12h",
        subject: String(userId),
    });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    const secret = env_config_1.parsedEnv.JWT_SECRET;
    const jwtPayload = jsonwebtoken_1.default.verify(token, secret);
    return jwtPayload;
}
exports.verifyToken = verifyToken;
