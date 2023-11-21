"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_CONFIG = void 0;
const env_config_1 = require("./env.config");
exports.GLOBAL_CONFIG = {
    nest: { port: parseInt(env_config_1.ENV.PORT || '5001') },
    cors: { enabled: true },
    globalPrefix: '/api',
    swagger: {
        enabled: env_config_1.ENV.IS_DEV,
        title: 'Nestjs Prisma Starter',
        description: 'The nestjs API description',
        version: '1.5',
        path: '/api/docs',
    },
    security: { expiresIn: 3600 * 24, bcryptSaltOrRound: 10 },
};
//# sourceMappingURL=global.config.js.map