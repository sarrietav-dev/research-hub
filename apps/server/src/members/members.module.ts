import { Module } from '@nestjs/common';
import { MemberServiceService } from './services/member-service/member-service.service';
import { MemberRepositoryService } from './services/member-repository/member-repository.service';

@Module({
  providers: [MemberServiceService, MemberRepositoryService]
})
export class MembersModule {}
