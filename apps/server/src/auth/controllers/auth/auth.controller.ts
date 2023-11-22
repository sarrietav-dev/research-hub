import { AuthService } from '@/auth/services/auth/auth.service';
import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common';
import { SignInDto, signInSchema } from './schemas';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('/sign-in')
  @UsePipes(new ValidateInputPipe(signInSchema))
  async signIn(@Body() { email, password }: SignInDto) {
    this.logger.debug(`/api/auth/sign-in POST`);

    return this.authService.signIn(email, password);
  }
}
