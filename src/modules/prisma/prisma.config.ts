import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { ENV } from 'src/config/env.config';

export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export const PRISMA_LOG_CONFIG: Array<LogDefinition> = [
  { level: 'warn', emit: 'stdout' },
  { level: 'info', emit: 'stdout' },
  { level: 'error', emit: 'stdout' },
  { level: 'query', emit: 'stdout' },
];

export const PRISMA_CLIENT_OPTIONS: PrismaClientOptions = {
  log: ENV.IS_DEV ? PRISMA_LOG_CONFIG : null,
};
