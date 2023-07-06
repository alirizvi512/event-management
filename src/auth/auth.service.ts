import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { AuthDto } from 'src/dto/AuthDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(authDto: AuthDto) {
    const check = await this.userService.validateUser(
      authDto.email,
      authDto.password,
    );
    if (check.code === HttpStatus.OK) {
      const payload = { sub: check.data };
      const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

      return {
        code: check.code,
        message: check.message,
        data: accessToken,
      };
    } else if (check.code === HttpStatus.UNAUTHORIZED) {
      const payload = { sub: check.data };
      const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

      return {
        code: check.code,
        message: check.message,
        data: accessToken,
      };
    } else {
      return check;
    }
  }

  async register(authDto: AuthDto) {
    const responseObj = await this.userService.create(authDto.email, authDto.password);
    const payload = { sub: responseObj.data };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
    return {
      code: responseObj.code,
      message: responseObj.message,
      data: accessToken,
    };
  }
}

