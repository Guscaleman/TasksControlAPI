import "express-async-errors";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import { handleGlobalErrors } from "./@shared/errors";
import { usersRouter } from "./user";
import { tasksRouter } from "./task";
import { categoriesRouter } from "./categories";

export const app = express();

app.use(helmet());

app.use(cors());

app.use(json());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);

app.use(handleGlobalErrors);
