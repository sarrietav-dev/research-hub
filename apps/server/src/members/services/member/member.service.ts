import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  constructor(private repo: MemberService) {}
}
