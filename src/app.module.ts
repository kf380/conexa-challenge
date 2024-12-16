import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { MoviesModule } from '@/modules/movies/movies.module';
import { RepositoryModule } from '@/infrastructure/mongodb/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.development',
    }),
    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ttl: 120,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/movies_db',
    ),
    RepositoryModule,
    AuthModule,
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {}
