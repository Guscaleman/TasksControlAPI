import { prisma } from "../database/prisma";
import { ApiError } from "../@shared/errors";
import { injectable } from "tsyringe";
import { CreateTask, UpdateTask } from "./interface";
import { taskReturnSchema } from "./schemas";

@injectable()
export class TasksService {
	public create = async (body: CreateTask, userId: number) => {
		if (body.categoryId) {
			const findCategory = await prisma.category.findUnique({
				where: { id: body.categoryId },
			});
			if (!findCategory) {
				throw new ApiError("Category not found", 404);
			}
		}
		const newTask = await prisma.task.create({ data: { ...body, userId } });
		return newTask;
	};

	public findAll = async (name: string | undefined, userId: number) => {
		const findAllTasks = await prisma.task.findMany({
			where: name
				? { category: { name: { contains: name, mode: "insensitive" } } }
				: { user: { id: userId } },
			include: { category: true },
		});

		const tasksArray = taskReturnSchema.array().parse(findAllTasks);
		const newArray = tasksArray.map((task) => ({
			...task,
			userId: userId,
		}));
		return newArray;
	};

	public findTask = async (id: number) => {
		const findTask = await prisma.task.findUnique({
			where: { id },
			include: { category: true },
		});

		return taskReturnSchema.parse(findTask);
	};

	public updateOne = async (id: number, data: UpdateTask) => {
		const updatedTask = await prisma.task.update({ where: { id }, data });
		return updatedTask;
	};

	public deleteOne = async (id: number) => {
		await prisma.task.delete({ where: { id } });
	};
}
