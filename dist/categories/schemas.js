"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryCreateSchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: zod_1.z.string(),
});
exports.categoryCreateSchema = exports.categorySchema.omit({ id: true });
