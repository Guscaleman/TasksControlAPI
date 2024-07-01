"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTaskOwner = void 0;
const errors_1 = require("../@shared/errors");
const prisma_1 = require("../database/prisma");
async function isTaskOwner(req, res, next) {
    const userId = +res.locals.jwtPayload.sub;
    const findId = await prisma_1.prisma.task.findFirst({
        where: { userId: userId },
    });
    if (!findId) {
        throw new errors_1.ApiError("This user is not the task owner", 403);
    }
    return next();
}
exports.isTaskOwner = isTaskOwner;
