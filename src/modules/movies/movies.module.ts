import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { RepositoryModule } from '@/infrastructure/mongodb/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
