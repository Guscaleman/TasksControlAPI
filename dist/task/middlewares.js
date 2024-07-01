"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskId = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../@shared/errors");
async function validateTaskId(req, res, next) {
    const taskId = +req.params.id;
    const findId = await prisma_1.prisma.task.findUnique({
        where: { id: taskId },
    });
    if (!findId) {
        throw new errors_1.ApiError("Task not found", 404);
    }
    next();
}
exports.validateTaskId = validateTaskId;
