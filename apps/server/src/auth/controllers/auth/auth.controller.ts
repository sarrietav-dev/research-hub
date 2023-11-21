import { AuthService } from '@/auth/services/auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }
}
