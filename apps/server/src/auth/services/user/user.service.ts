import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@/auth/domain/User';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

  async create(email: string, password: string, name: string): Promise<User> {
    password = await this.crypto.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException({
            error: 'Conflict',
            message: 'Email already exists',
          });
        }
      }
    }
  }
}
