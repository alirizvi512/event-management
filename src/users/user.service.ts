import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async validateUser(username: string, password: string) {
    return { id: "" };
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  // ...other methods
}