"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListener = void 0;
const common_1 = require("@nestjs/common");
const auth_helper_1 = require("../../shared/helpers/auth.helper");
let UserListener = class UserListener {
    static async onCreated(params, next) {
        if (params?.model === 'User' &&
            (params?.action === 'create' || params?.action === 'update')) {
            const password = params?.args?.data?.password;
            const encryptedPass = await auth_helper_1.AuthHelpers.hash(password);
            params.args['data'] = {
                ...params.args['data'],
                password: encryptedPass,
            };
        }
        return next(params);
    }
};
exports.UserListener = UserListener;
exports.UserListener = UserListener = __decorate([
    (0, common_1.Injectable)()
], UserListener);
//# sourceMappingURL=users.listener.js.map