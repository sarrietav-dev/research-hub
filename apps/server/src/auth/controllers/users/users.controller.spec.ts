import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from '@/auth/services/auth/auth.service';
import { CryptoService } from '@/auth/services/crypto/crypto.service';
import { UserService } from '@/auth/services/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SharedModule } from '@/shared/shared.module';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';
import { ZodObject } from 'zod';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UserService;
  let app: INestApplication;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        CryptoService,
        ValidateInputPipe,
        ZodObject,
      ],
      controllers: [UsersController],
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1h' },
        }),
        SharedModule,
      ],
    }).compile();

    module.useLogger(false);

    controller = module.get<UsersController>(UsersController);
    service = module.get<UserService>(UserService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should create a user', async () => {
      const inputUser = {
        email: 'test@test.com',
        password: 'password',
        name: 'testttt',
      };

      jest.spyOn(service, 'create').mockResolvedValue({
        id: 1,
        ...inputUser,
      });

      await request(app.getHttpServer())
        .post('/api/users')
        .send(inputUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email');
          expect(res.body).toHaveProperty('name');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    describe('when the input is invalid', () => {
      it('should return a 400 error when the email is invalid', async () => {
        const inputUser = {
          email: 'test',
          password: '8',
          name: '',
        };

        await request(app.getHttpServer())
          .post('/api/users')
          .send(inputUser)
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty('error');
            expect(res.body.message).toHaveProperty('email');
            expect(res.body.message).toHaveProperty('password');
            expect(res.body.message).toHaveProperty('name');
          });
      });

      it('should return a 400 error when the email is invalid', async () => {
        const inputUser = {
          email: 'test',
          password: '12345678',
          name: 'test',
        };

        await request(app.getHttpServer())
          .post('/api/users')
          .send(inputUser)
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty('error');
            expect(res.body.message).toHaveProperty('email');
          });
      });

      it('should return a 400 error when the password is invalid', async () => {
        const inputUser = {
          email: 'test@test.com',
          password: 'pass',
          name: 'test',
        };

        await request(app.getHttpServer())
          .post('/api/users')
          .send(inputUser)
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty('error');
            expect(res.body.message).toHaveProperty('password');
          });
      });

      it('should return a 400 error when the name is invalid', async () => {
        const inputUser = {
          email: 'test@test.com',
          password: 'pass123810293809123',
          name: '',
        };

        await request(app.getHttpServer())
          .post('/api/users')
          .send(inputUser)
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty('error');
            expect(res.body.message).toHaveProperty('name');
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
