"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const errors_1 = require("../errors");
function validateBody(schema) {
    return (req, res, next) => {
        const parseResult = schema.safeParse(req.body);
        if (!parseResult.success) {
            throw new errors_1.BodyValidationError(parseResult.error);
        }
        req.body = parseResult.data;
        next();
    };
}
exports.validateBody = validateBody;
