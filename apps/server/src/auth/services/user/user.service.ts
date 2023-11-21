import { Injectable } from '@nestjs/common';
import { User } from '@/auth/domain/User';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    password = await this.crypto.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return user;
  }
}
