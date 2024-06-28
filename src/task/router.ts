import { Router } from "express";
import { validateBody } from "../@shared/validators";
import { isAuthenticated } from "../@shared/validators/isAuthenticated.validator";
import { container } from "tsyringe";
import { isTaskOwner } from "../user/middlewares";
import { TasksService } from "./service";
import { TasksController } from "./controller";
import { taskCreateSchema, taskUpdateSchema } from "./schemas";
import { validateTaskId } from "./middlewares";

export const tasksRouter = Router();

container.registerSingleton("TasksService", TasksService);
const tasksController = container.resolve(TasksController);

tasksRouter.post(
	"/",
	isAuthenticated,
	validateBody(taskCreateSchema),
	(req, res) => tasksController.create(req, res)
);
tasksRouter.get("/", isAuthenticated, (req, res) =>
	tasksController.findAll(req, res)
);
tasksRouter.get("/:id", isAuthenticated, validateTaskId, (req, res) =>
	tasksController.findOne(req, res)
);
tasksRouter.patch(
	"/:id",
	isAuthenticated,
	validateTaskId,
	isTaskOwner,
	validateBody(taskUpdateSchema),
	(req, res) => tasksController.updateOne(req, res)
);
tasksRouter.delete(
	"/:id",
	isAuthenticated,
	validateTaskId,
	isTaskOwner,
	(req, res) => tasksController.deleteOne(req, res)
);
