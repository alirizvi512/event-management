import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from './jwt/jwt.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from './users/user.module';
import { ConfigService } from '@nestjs/config';
import { UserService } from './users/user.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtAuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigService, UserService, JwtStrategy],
})
export class AppModule {}
