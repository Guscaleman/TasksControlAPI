"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../@shared/errors");
const tsyringe_1 = require("tsyringe");
let CategoriesService = class CategoriesService {
    create = async (body, userId) => {
        const newCategory = await prisma_1.prisma.category.create({
            data: { ...body, userId },
        });
        return newCategory;
    };
    findOne = async (id) => {
        const category = await prisma_1.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new errors_1.ApiError("Category not found", 404);
        }
        return category;
    };
    deleteOne = async (id) => {
        await this.findOne(id);
        await prisma_1.prisma.category.delete({ where: { id } });
    };
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, tsyringe_1.injectable)()
], CategoriesService);
