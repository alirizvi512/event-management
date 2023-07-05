import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { AuthDto } from 'src/dto/AuthDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const check = await this.userService.validateUser(
      authDto.email,
      authDto.password,
    );
      console.log("Check User", check);
    if (check.code !== HttpStatus.OK) {
      return check;
    }

    const payload = { sub: check.data };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

    return {
      code: check.code,
      message: check.message,
      data: accessToken,
    };
  }

  async register (authDto: AuthDto) {
    return await this.userService.create(authDto.email, authDto.password);
  }
}

