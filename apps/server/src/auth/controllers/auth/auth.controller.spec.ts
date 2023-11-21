import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth/auth.service';
import { CryptoService } from '@/auth/services/crypto/crypto.service';
import { UserService } from '@/auth/services/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as request from 'supertest';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, PrismaService, CryptoService],
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#signIn', () => {
    it('should return an object with an accessToken property', async () => {
      const email = 'test@test.com';
      const password = 'password';

      jest.spyOn(service, 'signIn').mockResolvedValue({
        accessToken: 'test',
      });

      await request(app.getHttpServer())
        .post('/api/auth/sign-in')
        .send({ email, password })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
