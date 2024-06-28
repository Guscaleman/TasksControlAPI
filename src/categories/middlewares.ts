import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";
import { prisma } from "../database/prisma";

export async function isCategoryOwner(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = +res.locals.jwtPayload.sub;

	const findCategoryId = await prisma.category.findFirst({
		where: { userId: userId },
	});

	if (!findCategoryId) {
		throw new ApiError("This user is not the category owner", 403);
	}

	return next();
}
