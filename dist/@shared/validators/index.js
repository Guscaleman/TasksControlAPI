"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.validateBody = void 0;
var body_validator_1 = require("./body.validator");
Object.defineProperty(exports, "validateBody", { enumerable: true, get: function () { return body_validator_1.validateBody; } });
var isAuthenticated_validator_1 = require("./isAuthenticated.validator");
Object.defineProperty(exports, "isAuthenticated", { enumerable: true, get: function () { return isAuthenticated_validator_1.isAuthenticated; } });
