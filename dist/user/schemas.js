"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWithoutPasswordSchema = exports.userLoginSchema = exports.userRegisterSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1).email(),
    password: zod_1.z.string().min(4),
});
exports.userRegisterSchema = exports.userSchema.omit({ id: true });
exports.userLoginSchema = exports.userSchema.pick({ email: true, password: true });
exports.userWithoutPasswordSchema = exports.userSchema.omit({ password: true });
