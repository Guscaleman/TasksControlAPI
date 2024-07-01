"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const tsyringe_1 = require("tsyringe");
const service_1 = require("./service");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create = async (req, res) => {
        const task = await this.tasksService.create(req.body, +res.locals.jwtPayload.sub);
        return res.status(201).json(task);
    };
    findAll = async (req, res) => {
        const name = req.query.category ? String(req.query.category) : undefined;
        const tasks = await this.tasksService.findAll(name, +res.locals.jwtPayload.sub);
        return res.json(tasks);
    };
    findOne = async (req, res) => {
        const task = await this.tasksService.findTask(Number(req.params.id));
        return res.status(200).json(task);
    };
    updateOne = async (req, res) => {
        const task = await this.tasksService.updateOne(Number(req.params.id), req.body);
        return res.status(200).json(task);
    };
    deleteOne = async (req, res) => {
        await this.tasksService.deleteOne(Number(req.params.id));
        return res.status(204).json();
    };
};
exports.TasksController = TasksController;
exports.TasksController = TasksController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TasksService")),
    __metadata("design:paramtypes", [service_1.TasksService])
], TasksController);
