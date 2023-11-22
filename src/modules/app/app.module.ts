import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_CONFIG } from 'src/config/global.config';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { GlobalInterceptor } from 'src/interceptors/global.interceptor';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    LoggerModule,
    CommonModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: GlobalInterceptor },
  ],
})
export class AppModule {}
