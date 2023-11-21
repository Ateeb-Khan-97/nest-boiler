import { Injectable } from '@nestjs/common';
import { AuthHelpers } from 'src/shared/helpers/auth.helper';

@Injectable()
export class UserListener {
  static async onCreated(params, next) {
    if (
      params?.model === 'User' &&
      (params?.action === 'create' || params?.action === 'update')
    ) {
      const password = params?.args?.data?.password;
      const encryptedPass = await AuthHelpers.hash(password);
      params.args['data'] = {
        ...params.args['data'],
        password: encryptedPass,
      };
    }
    return next(params);
  }
}
