import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Users E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('3. Registro de usuario nuevo', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send({ email: 'test-backend@gmail.com', password: '123456', role:'admin' });
    expect(res.status).toBe(201);
  });

  it('4. Registro duplicado (mismo email)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send({ email: 'unique@test.com', password: '123456' });
    expect(res.status).toBe(409);
  });

  afterAll(async () => {
    await app.close();
  });
});
