"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.ENV = {
    PORT: process.env.PORT,
    JWT_SIGNATURE: process.env.JWT_SIGNATURE,
    IS_DEV: process.env.NODE_ENV === 'dev',
    IS_PROD: process.env.NODE_ENV === 'prod',
};
//# sourceMappingURL=env.config.js.map