import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { generateSalt, verifyHash } from 'src/utils/hash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    })
    if (user) {
      const result = await verifyHash(password, user.password);
      if (result) {
        return { code: HttpStatus.OK, message: "Succesfully Logged In", data: user.id };  
      } else {
        return { code: HttpStatus.BAD_REQUEST, message: "Invalid Credentials" };
      }
    }
    return { code: HttpStatus.NOT_FOUND, message: "User not found with the specified email" };
  }

  async create(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email }
    })
    if (existingUser) {
      return { code: HttpStatus.BAD_REQUEST, message: "User Already Exists" };
    }
    const hashedPassword = await generateSalt(password);
    const user = await this.prisma.user.create({ data: { email, password: hashedPassword } });
    return { code: HttpStatus.OK, message: "Succesfully Created", data: user.id };  
  }
}