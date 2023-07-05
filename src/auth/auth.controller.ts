import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthDto, authSchema } from 'src/dto/AuthDto';
import { YupValidationPipe } from 'src/utils/yupValidationPipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new YupValidationPipe(authSchema))
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('register')
  @UsePipes(new YupValidationPipe(authSchema))
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute() {
    return 'This is a protected route.';
  }
}
