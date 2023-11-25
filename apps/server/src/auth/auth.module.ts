import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from './services/crypto/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  providers: [AuthService, UserService, CryptoService, PrismaService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
