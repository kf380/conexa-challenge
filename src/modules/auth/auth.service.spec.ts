import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/modules/users/users.service';
import { AuthService } from '@/modules/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockUsersService = { findByEmail: jest.fn() };
    mockJwtService = { sign: jest.fn().mockReturnValue('signed-token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('15. validateUser should return null if password mismatch', async () => {
    (mockUsersService.findByEmail as jest.Mock).mockResolvedValue({ password: 'hashed' });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    const result = await service.validateUser('test@invalid.com', 'wrong');
    expect(result).toBeNull();
  });
});
