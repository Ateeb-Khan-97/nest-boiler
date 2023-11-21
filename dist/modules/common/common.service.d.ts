export declare class CommonService {
    exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key>;
}
