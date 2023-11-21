import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  /**
   * Removing keys from an object
   * @param object
   * @param keys
   * @returns
   */
  public exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<T, Key>;
  }
}
