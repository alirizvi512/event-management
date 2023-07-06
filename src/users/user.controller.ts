import { Controller, Get, UseGuards, Request, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("verify/:code")
  @UseGuards(JwtAuthGuard)
  async verify(@Request() { user }, @Param() { code }) {
    if (user.verificationCode === code) {
      await this.userService.verifyUser(user.id);
      return {
        code: HttpStatus.OK,
        message: "Verified",
      }
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: "Invalid Code",
      }
    }
  }
}
