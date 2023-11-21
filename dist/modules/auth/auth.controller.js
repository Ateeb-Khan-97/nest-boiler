"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const global_constants_1 = require("../../shared/constants/global.constants");
const auth_public_decorator_1 = require("./auth.public.decorator");
const Response_mapper_1 = require("../../shared/mappers/Response.mapper");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(user, res) {
        const loginData = await this.authService.login(user);
        res.cookie('accessToken', loginData.accessToken, {
            expires: new Date(new Date().getTime() + global_constants_1.JWT_EXPIRY_SECONDS * 1000),
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
        });
        res.status(200).send({
            status: 200,
            message: 'Successfully Login',
            data: loginData,
            success: true,
        });
    }
    async register(user) {
        return Response_mapper_1.ResponseMapper.map({
            status: 201,
            message: 'Successfully Registered',
            data: await this.authService.register(user),
        });
    }
    logout(res) {
        res.clearCookie('accessToken');
        res
            .status(200)
            .send({ status: 200, message: 'Success', data: null, success: true });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ description: 'Login user' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginUserDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, auth_public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map