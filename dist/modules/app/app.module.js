"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const global_config_1 = require("../../config/global.config");
const logger_middleware_1 = require("../../middlewares/logger.middleware");
const prisma_module_1 = require("../prisma/prisma.module");
const common_module_1 = require("../common/common.module");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const core_1 = require("@nestjs/core");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [() => global_config_1.GLOBAL_CONFIG] }),
            common_module_1.CommonModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UserModule,
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: auth_jwt_guard_1.JwtAuthGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map