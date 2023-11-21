import { ENV } from 'src/config/env.config';

export const JWT_SECRET = ENV.JWT_SIGNATURE;
export const JWT_EXPIRY_SECONDS = 3600;
