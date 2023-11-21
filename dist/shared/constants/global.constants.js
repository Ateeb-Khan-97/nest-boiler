"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRY_SECONDS = exports.JWT_SECRET = void 0;
const env_config_1 = require("../../config/env.config");
exports.JWT_SECRET = env_config_1.ENV.JWT_SIGNATURE;
exports.JWT_EXPIRY_SECONDS = 3600;
//# sourceMappingURL=global.constants.js.map