import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { generateSalt, verifyHash } from './../utils/hash';
import { mail } from './../utils/mailer';
import { codeGenerator } from './../utils/codeGenerator';

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
      if (user.verified) {
        const result = await verifyHash(password, user.password);
        if (result) {
          return { code: HttpStatus.OK, message: "Succesfully Logged In", data: user.id };
        } else {
          return { code: HttpStatus.BAD_REQUEST, message: "Invalid Credentials" };
        }
      } else {
        const verificationCode = await codeGenerator();
        await mail(email, verificationCode);
        await this.prisma.user.update({
          where: { id: user.id },
          data: { ...user, verificationCode: verificationCode },
        });
        return { code: HttpStatus.UNAUTHORIZED, message: "User not Verified. Verification code has been sent again.", data: user.id };
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
    const verificationCode = await codeGenerator();
    const user = await this.prisma.user.create({ data: { email, password: hashedPassword, verificationCode } });
    await mail(email, verificationCode);
    return { code: HttpStatus.OK, message: "Succesfully Created", data: user.id };  
  }

  async verifyUser(id: number) {
    await this.prisma.user.update({ where: { id }, data: { verified: true } });
  }
}