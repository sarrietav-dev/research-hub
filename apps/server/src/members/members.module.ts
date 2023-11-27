import { Module } from '@nestjs/common';
import { MemberService } from './services/member/member.service';
import { MemberRepositoryService } from './services/member-repository/member-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import { MembersController } from './controllers/members.controller';

@Module({
  providers: [MemberService, MemberRepositoryService, PrismaService],
  controllers: [MembersController],
})
export class MembersModule {}
