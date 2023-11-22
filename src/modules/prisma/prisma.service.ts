import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PRISMA_CLIENT_OPTIONS } from './prisma.config';
import { UserListener } from '../users/users.listener';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly userListener: UserListener) {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(this.userListener.onCreated);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
