import { HttpStatus } from '@nestjs/common';

interface IResponseType {
  status?: HttpStatus;
  message?: string;
  data?: unknown;
}
export class ResponseMapper {
  public static map(options?: IResponseType) {
    if (options) {
      const { data = null, message = 'Success', status = 200 } = options;
      return { data, message, status, success: status >= 200 && status < 300 };
    }
    return { data: null, message: 'Success', status: 200, success: true };
  }
}
