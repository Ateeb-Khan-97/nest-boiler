import { HttpStatus } from '@nestjs/common';
interface IResponseType {
    status?: HttpStatus;
    message?: string;
    data?: unknown;
}
export declare class ResponseMapper {
    static map(options?: IResponseType): {
        data: unknown;
        message: string;
        status: number;
        success: boolean;
    };
}
export {};
