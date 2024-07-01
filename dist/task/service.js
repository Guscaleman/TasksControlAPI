"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../@shared/errors");
const tsyringe_1 = require("tsyringe");
const schemas_1 = require("./schemas");
let TasksService = class TasksService {
    create = async (body, userId) => {
        if (body.categoryId) {
            const findCategory = await prisma_1.prisma.category.findUnique({
                where: { id: body.categoryId },
            });
            if (!findCategory) {
                throw new errors_1.ApiError("Category not found", 404);
            }
        }
        const newTask = await prisma_1.prisma.task.create({ data: { ...body, userId } });
        return newTask;
    };
    findAll = async (name, userId) => {
        const findAllTasks = await prisma_1.prisma.task.findMany({
            where: name
                ? { category: { name: { contains: name, mode: "insensitive" } } }
                : { user: { id: userId } },
            include: { category: true },
        });
        const tasksArray = schemas_1.taskReturnSchema.array().parse(findAllTasks);
        const newArray = tasksArray.map((task) => ({
            ...task,
            userId: userId,
        }));
        return newArray;
    };
    findTask = async (id) => {
        const findTask = await prisma_1.prisma.task.findUnique({
            where: { id },
            include: { category: true },
        });
        return schemas_1.taskReturnSchema.parse(findTask);
    };
    updateOne = async (id, data) => {
        const updatedTask = await prisma_1.prisma.task.update({ where: { id }, data });
        return updatedTask;
    };
    deleteOne = async (id) => {
        await prisma_1.prisma.task.delete({ where: { id } });
    };
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, tsyringe_1.injectable)()
], TasksService);
