import { Module } from '@nestjs/common';
import { MemberService } from './services/member/member.service';
import { MemberRepositoryService } from './services/member-repository/member-repository.service';

@Module({
  providers: [MemberService, MemberRepositoryService]
})
export class MembersModule {}
