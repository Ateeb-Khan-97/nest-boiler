import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
  imports: [],
  exports: [CommonService],
  providers: [CommonService],
})
export class CommonModule {}
