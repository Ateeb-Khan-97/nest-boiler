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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_service_1 = require("../common/common.service");
let UserService = class UserService {
    constructor(prisma, commonService) {
        this.prisma = prisma;
        this.commonService = commonService;
    }
    async findUser(where) {
        return await this.prisma.user.findFirst({ where });
    }
    async findAllUsers(where) {
        const users = await this.prisma.user.findMany({ where });
        return users.map((each) => this.commonService.exclude(each, ['password']));
    }
    async createUser(data) {
        const emailExists = await this.findUser({ email: data.email });
        if (emailExists)
            throw new common_1.BadRequestException('Email already exists');
        const nUser = await this.prisma.user.create({ data });
        return this.commonService.exclude(nUser, ['password']);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_service_1.CommonService])
], UserService);
//# sourceMappingURL=users.service.js.map