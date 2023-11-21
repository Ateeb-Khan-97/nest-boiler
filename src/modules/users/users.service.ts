import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  public async findUser(where: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({ where });
  }

  public async findAllUsers(where?: Prisma.UserWhereInput) {
    const users = await this.prisma.user.findMany({ where });
    return users.map((each) => this.commonService.exclude(each, ['password']));
  }

  public async createUser(data: Prisma.UserUncheckedCreateInput) {
    const emailExists = await this.findUser({ email: data.email });
    if (emailExists) throw new BadRequestException('Email already exists');
    const nUser = await this.prisma.user.create({ data });
    return this.commonService.exclude(nUser, ['password']);
  }
}
