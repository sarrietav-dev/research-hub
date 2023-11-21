import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.cryptoService.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
