import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from '../../infrastructure/mongodb/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
