import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtService],
})
export class AuthModule {}
