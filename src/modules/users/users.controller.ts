import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto.email, createUserDto.password, createUserDto.role);
  }
  
}
