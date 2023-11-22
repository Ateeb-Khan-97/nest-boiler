import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserListener } from '../users/users.listener';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService, UserListener],
})
export class PrismaModule {}
