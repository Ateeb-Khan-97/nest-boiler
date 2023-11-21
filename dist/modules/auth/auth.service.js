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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const auth_helper_1 = require("../../shared/helpers/auth.helper");
const global_config_1 = require("../../config/global.config");
const common_service_1 = require("../common/common.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, commonService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.commonService = commonService;
    }
    async login({ email, password }) {
        const userData = await this.userService.findUser({
            email,
        });
        if (!userData)
            throw new common_1.UnauthorizedException();
        const isMatch = await auth_helper_1.AuthHelpers.verify(password, userData.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException();
        const payload = this.commonService.exclude(userData, ['password']);
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: global_config_1.GLOBAL_CONFIG.security.expiresIn,
        });
        return {
            user: payload,
            accessToken: accessToken,
        };
    }
    async register(user) {
        return this.userService.createUser(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService,
        common_service_1.CommonService])
], AuthService);
//# sourceMappingURL=auth.service.js.map