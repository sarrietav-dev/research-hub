import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, CryptoService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getUserByEmail', () => {
    it('should return a user', async () => {
      const expected = {
        id: 1,
        email: 'test@test.com',
        password: 'password',
        name: 'Test',
      };

      prismaService.user.findUnique = jest.fn().mockResolvedValue(expected);

      const user = await service.getUserByEmail('test@test.com');

      expect(user).toEqual(expected);
    });

    it('should return null', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

      const user = await service.getUserByEmail('');

      expect(user).toBeNull();
    });
  });

  describe('#createUser', () => {
    it('should return a user', async () => {
      const expectedUser = {
        id: 1,
        email: 'test@test.com',
        password: 'oiuas7844747/%/75($%',
      };

      prismaService.user.create = jest.fn().mockResolvedValue(expectedUser);
      cryptoService.hash = jest.fn().mockResolvedValue(expectedUser.password);

      const user = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test',
      };

      const createdUser = await service.createUser(
        user.email,
        user.password,
        user.name,
      );

      expect(createdUser).toEqual(expectedUser);
    });
  });
});
