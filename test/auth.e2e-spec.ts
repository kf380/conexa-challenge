import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('1. Login con credenciales válidas', async () => {
    await request(app.getHttpServer())
    .post('/users/sign-up')
    .send({ email: 'admin10@test.com', password: '123456', role: 'admin' });
  
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'valid@test.com', password: '123456' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
  });

  it('2. Login con credenciales inválidas', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'invalid@test.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
