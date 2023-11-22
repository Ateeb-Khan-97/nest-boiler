import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';

@Injectable()
export class UserListener {
  constructor(private readonly commonService: CommonService) {}
  async onCreated(params, next) {
    if (
      params?.model === 'User' &&
      (params?.action === 'create' || params?.action === 'update')
    ) {
      const password = params?.args?.data?.password;
      const encryptedPass = await this.commonService.hash(password);
      params.args['data'] = {
        ...params.args['data'],
        password: encryptedPass,
      };
    }
    return next(params);
  }
}
