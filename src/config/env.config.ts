import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  JWT_SIGNATURE: process.env.JWT_SIGNATURE,
  IS_DEV: process.env.NODE_ENV === 'dev',
  IS_PROD: process.env.NODE_ENV === 'prod',
};
