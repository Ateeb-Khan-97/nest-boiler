import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CommonService } from '../common/common.service';
export declare class UserService {
    private readonly prisma;
    private readonly commonService;
    constructor(prisma: PrismaService, commonService: CommonService);
    findUser(where: Prisma.UserWhereInput): Promise<{
        name: string;
        username: string;
        email: string;
        password: string;
        id: string;
        created: Date;
        updated: Date;
    }>;
    findAllUsers(where?: Prisma.UserWhereInput): Promise<Omit<{
        name: string;
        username: string;
        email: string;
        password: string;
        id: string;
        created: Date;
        updated: Date;
    }, "password">[]>;
    createUser(data: Prisma.UserUncheckedCreateInput): Promise<Omit<{
        name: string;
        username: string;
        email: string;
        password: string;
        id: string;
        created: Date;
        updated: Date;
    }, "password">>;
}
