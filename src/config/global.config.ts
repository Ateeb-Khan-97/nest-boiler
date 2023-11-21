import { Config } from './config.interface';
import { ENV } from './env.config';

export const GLOBAL_CONFIG: Config = {
  nest: { port: parseInt(ENV.PORT || '5001') },
  cors: { enabled: true },
  globalPrefix: '/api',
  swagger: {
    enabled: ENV.IS_DEV,
    title: 'Nestjs Prisma Starter',
    description: 'The nestjs API description',
    version: '1.5',
    path: '/api/docs',
  },
  security: { expiresIn: 3600 * 24, bcryptSaltOrRound: 10 },
};
