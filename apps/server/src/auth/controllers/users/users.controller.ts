import { UserService } from '@/auth/services/user/user.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    const user = await this.userService.create(email, password, name);
    return user;
  }
}
