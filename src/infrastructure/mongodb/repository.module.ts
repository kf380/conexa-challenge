import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieEntity, MovieSchema } from './schemas/movie.schema';
import { UserEntity, UserSchema } from './schemas/user.schema';
import { MongoUserRepository } from './repositories/user.repository';
import { MongoMovieRepository } from './repositories/movie.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieEntity.name, schema: MovieSchema },
      { name: UserEntity.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: 'IMovieRepository',
      useClass: MongoMovieRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: MongoUserRepository,
    },
  ],
  exports: [
    'IMovieRepository',
    'IUserRepository',
  ],
})
export class RepositoryModule {}
