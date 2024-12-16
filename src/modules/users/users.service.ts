import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/common/interfaces/user-repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async createUser(email: string, password: string, role: string ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepo.createUser(email, hashedPassword, role);
  }

  async findByEmail(email: string) {
    return this.userRepo.findUserByEmail(email);
  }

  async findById(id: string) {
    const user = await this.userRepo.findUserById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
