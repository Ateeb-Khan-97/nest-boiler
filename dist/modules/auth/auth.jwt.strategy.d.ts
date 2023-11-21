import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CommonService } from '../common/common.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    private readonly commonService;
    constructor(prisma: PrismaService, commonService: CommonService);
    private static extractJWT;
    validate(payload: User): Promise<Omit<User, 'password' | 'created' | 'updated'>>;
}
export {};
