import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';

@Injectable()
export class CommonService {
  public hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(8).toString('hex');
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  public verify(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'));
      });
    });
  }

  public exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<T, Key>;
  }
}
