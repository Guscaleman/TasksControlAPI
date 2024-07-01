"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedEnv = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    JWT_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
});
function validateEnvVars() {
    const parseResult = envSchema.safeParse(process.env);
    if (!parseResult.success) {
        parseResult.error.errors.forEach(({ path, message }) => {
            return console.error(`Enviroment variable ${path}: ${message}`);
        });
        process.exit(1);
    }
    return parseResult.data;
}
exports.parsedEnv = validateEnvVars();
