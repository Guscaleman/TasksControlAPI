"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const prisma_1 = require("../database/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../@shared/errors");
const jwt_config_1 = require("../configs/jwt.config");
const tsyringe_1 = require("tsyringe");
const schemas_1 = require("./schemas");
let UsersServices = class UsersServices {
    async findByEmail(email) {
        const account = prisma_1.prisma.user.findUnique({ where: { email } });
        return account;
    }
    async register(body) {
        const isEmailValid = await this.findByEmail(body.email);
        if (isEmailValid) {
            throw new errors_1.ApiError("This email is already registered", 409);
        }
        body.password = await bcryptjs_1.default.hash(body.password, 10);
        const newUser = await prisma_1.prisma.user.create({ data: body });
        return schemas_1.userWithoutPasswordSchema.parse(newUser);
    }
    async login(body) {
        const user = await prisma_1.prisma.user.findFirst({ where: { email: body.email } });
        if (!user) {
            throw new errors_1.ApiError("User not exists", 404);
        }
        const compare = await bcryptjs_1.default.compare(body.password, user.password);
        if (!compare) {
            throw new errors_1.ApiError("Email and password doesn't match", 401);
        }
        const token = (0, jwt_config_1.generateToken)({}, user.id);
        return {
            accessToken: token,
            user: schemas_1.userWithoutPasswordSchema.parse(user),
        };
    }
    async getUser(id) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        return schemas_1.userWithoutPasswordSchema.parse(user);
    }
};
exports.UsersServices = UsersServices;
exports.UsersServices = UsersServices = __decorate([
    (0, tsyringe_1.injectable)()
], UsersServices);
