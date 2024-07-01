"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCategoryOwner = void 0;
const errors_1 = require("../@shared/errors");
const prisma_1 = require("../database/prisma");
async function isCategoryOwner(req, res, next) {
    const userId = +res.locals.jwtPayload.sub;
    const findCategoryId = await prisma_1.prisma.category.findFirst({
        where: { userId: userId },
    });
    if (!findCategoryId) {
        throw new errors_1.ApiError("This user is not the category owner", 403);
    }
    return next();
}
exports.isCategoryOwner = isCategoryOwner;
