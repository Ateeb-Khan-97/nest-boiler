import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CommonService } from '../common/common.service';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: MyLogger,
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {
    this.logger.setContext(UserService.name);
  }

  public async findUser(where: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({ where });
  }

  public async findAllUsers(where?: Prisma.UserWhereInput) {
    const users = await this.prisma.user.findMany({ where });
    return users.map((each) => this.commonService.exclude(each, ['password']));
  }

  public async createUser(data: Prisma.UserUncheckedCreateInput) {
    try {
      const userExists = await this.findUser({ email: data.email });
      if (userExists) throw new BadRequestException('Email already exists');
      const nUser = await this.prisma.user.create({ data });
      return this.commonService.exclude(nUser, ['password']);
    } catch (err) {
      this.logger.error(err.message);
      throw err;
    }
  }
}
