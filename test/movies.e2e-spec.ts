import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Movies E2E', () => {
  let app: INestApplication;
  let adminToken: string;
  let movieId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
    .post('/users/sign-up')
    .send({ email: 'admin60@test.com', password: '123456', role: 'admin' });
  
  const loginRes = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 'admin60@test.com', password: '123456' });
  adminToken = loginRes.body.access_token;
  console.log('loginRes.body', loginRes.body);
  
  });

  it('5. Crear película (admin)', async () => {
    const res = await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Matrix', director: 'Wachowski' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Matrix');
    movieId = res.body._id || res.body.id;
  });

  it('6. Listar películas paginadas', async () => {
    const res = await request(app.getHttpServer())
      .get('/movies?limit=5&offset=0')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total');
  });

  it('7. Obtener detalle de la película', async () => {
    const res = await request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Matrix');
  });

  it('8. Actualizar película (admin)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Matrix Reloaded' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Matrix Reloaded');
  });

  it('9. Eliminar película (admin)', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect([200, 204]).toContain(res.status);
  });

  afterAll(async () => {
    await app.close();
  });
});
