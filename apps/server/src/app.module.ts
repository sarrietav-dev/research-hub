import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, SharedModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
