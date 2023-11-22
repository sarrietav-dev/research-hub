import { AuthService } from '@/auth/services/auth/auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignInDto, signInSchema } from './schemas';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @UsePipes(new ValidateInputPipe(signInSchema))
  async signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }
}
