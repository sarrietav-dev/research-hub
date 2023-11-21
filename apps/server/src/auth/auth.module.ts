import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [AuthService, UserService],
  imports: [PrismaService],
})
export class AuthModule {}
