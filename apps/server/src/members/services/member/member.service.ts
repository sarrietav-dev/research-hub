import { Injectable } from '@nestjs/common';
import { MemberRepositoryService } from '../member-repository/member-repository.service';

@Injectable()
export class MemberService {
  constructor(private repo: MemberRepositoryService) {}
}
