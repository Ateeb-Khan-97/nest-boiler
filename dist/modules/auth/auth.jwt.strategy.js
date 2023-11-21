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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const global_constants_1 = require("../../shared/constants/global.constants");
const prisma_service_1 = require("../prisma/prisma.service");
const common_service_1 = require("../common/common.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(prisma, commonService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                passport_jwt_1.ExtractJwt.fromUrlQueryParameter('token'),
                JwtStrategy_1.extractJWT,
            ]),
            ignoreExpiration: process.env.NODE_ENV === 'dev',
            secretOrKey: global_constants_1.JWT_SECRET,
        });
        this.prisma = prisma;
        this.commonService = commonService;
    }
    static extractJWT(req) {
        if (req.cookies && 'token' in req.cookies)
            return req.cookies.token;
        return null;
    }
    async validate(payload) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { email: payload.email },
            });
            return this.commonService.exclude(user, [
                'password',
                'created',
                'updated',
            ]);
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_service_1.CommonService])
], JwtStrategy);
//# sourceMappingURL=auth.jwt.strategy.js.map