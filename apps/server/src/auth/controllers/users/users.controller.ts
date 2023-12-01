import { UserService } from '@/auth/services/user/user.service';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';
import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  UsePipes,
} from '@nestjs/common';
import { createUserSchema, CreateUserDto } from './schemas';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(UsersController.name);

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidateInputPipe(createUserSchema))
  async create(@Body() { email, name, password }: CreateUserDto) {
    this.logger.debug(`/api/users POST`);

    const user = await this.userService.create(email, password, name);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
