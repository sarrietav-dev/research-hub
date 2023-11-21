import { UserService } from '@/auth/services/user/user.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() { email, password, name }: CreateUserDto) {
    const user = await this.userService.create(email, password, name);
    return user;
  }
}

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

type CreateUserDto = z.infer<typeof createUserSchema>;
