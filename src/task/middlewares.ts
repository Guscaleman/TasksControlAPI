import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";

export async function validateTaskId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const taskId = +req.params.id;

	const findId = await prisma.task.findUnique({
		where: { id: taskId },
	});

	if (!findId) {
		throw new ApiError("Task not found", 404);
	}

	next();
}
