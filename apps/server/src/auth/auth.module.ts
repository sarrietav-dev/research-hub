import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from './services/crypto/crypto.service';

@Module({
  providers: [AuthService, UserService, CryptoService],
  imports: [PrismaService],
})
export class AuthModule {}
