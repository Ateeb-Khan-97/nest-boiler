"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMapper = void 0;
class ResponseMapper {
    static map(options) {
        if (options) {
            const { data = null, message = 'Success', status = 200 } = options;
            return { data, message, status, success: status >= 200 && status < 300 };
        }
        return { data: null, message: 'Success', status: 200, success: true };
    }
}
exports.ResponseMapper = ResponseMapper;
//# sourceMappingURL=Response.mapper.js.map