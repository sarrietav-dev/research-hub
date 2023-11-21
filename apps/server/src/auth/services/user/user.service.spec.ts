import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
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
});
