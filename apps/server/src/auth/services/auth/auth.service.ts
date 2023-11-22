import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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

  private readonly logger = new Logger(AuthService.name);

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      this.logger.debug(`User not found with email ${email}`);
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.cryptoService.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      this.logger.debug(`Password mismatch for user ${user.id}`);
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };

    this.logger.debug(`User ${user.id} authenticated`);

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
