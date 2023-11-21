import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, PrismaService, CryptoService],
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an object with an accessToken property', async () => {
      const email = 'test@test.com';
      const password = 'password';

      const user = {
        id: 1,
        email,
        password,
        name: 'Test',
      };

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      jest.spyOn(cryptoService, 'compare').mockResolvedValue(true);

      const result = await service.signIn(email, password);

      expect(result).toHaveProperty('accessToken');
    });

    it('should throw an error if the user does not exist', async () => {
      const email = 'test@test.com';
      const password = 'password';

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

      await expect(service.signIn(email, password)).rejects.toThrow(
        new UnauthorizedException(),
      );
    });

    it('should throw an error if passwords do not match', async () => {
      const email = 'test@test.com';
      const password = 'password';

      const user = {
        id: 1,
        email,
        password,
        name: 'Test',
      };

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      jest.spyOn(cryptoService, 'compare').mockResolvedValue(false);

      await expect(service.signIn(email, password)).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
  });
});
