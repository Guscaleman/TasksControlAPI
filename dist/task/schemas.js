"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskReturnSchema = exports.taskUpdateSchema = exports.taskCreateSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const schemas_1 = require("../categories/schemas");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    title: zod_1.z.string().max(20),
    content: zod_1.z.string().max(20),
    finished: zod_1.z.boolean(),
    categoryId: zod_1.z.number().int().positive().nullish(),
});
exports.taskCreateSchema = exports.taskSchema.omit({
    id: true,
    finished: true,
});
exports.taskUpdateSchema = exports.taskSchema.omit({ id: true });
exports.taskReturnSchema = exports.taskSchema
    .omit({ categoryId: true })
    .extend({ category: schemas_1.categorySchema.nullish() });
