"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const all_exception_1 = require("./filters/all.exception");
const csrf_protection_1 = require("@fastify/csrf-protection");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const global_config_1 = require("./config/global.config");
const app_module_1 = require("./modules/app/app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cookie_1 = require("@fastify/cookie");
const helmet_1 = require("@fastify/helmet");
const cors_1 = require("@fastify/cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix(global_config_1.GLOBAL_CONFIG.globalPrefix);
    app.register(cookie_1.default, { secret: '' });
    app.register(helmet_1.default);
    app.register(csrf_protection_1.default, { cookieOpts: { signed: true } });
    app.register(cors_1.default, { credentials: true, origin: `*` });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new all_exception_1.AllExceptionsFilter(app.get(core_1.HttpAdapterHost)));
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = configService.get('swagger');
    if (swaggerConfig.enabled) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle(swaggerConfig.title)
            .setDescription(swaggerConfig.description)
            .setVersion(swaggerConfig.version)
            .addBearerAuth({
            description: `Please enter token in following format: Bearer <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }
    await app.listen(global_config_1.GLOBAL_CONFIG.nest.port);
}
bootstrap();
//# sourceMappingURL=main.js.map