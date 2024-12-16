import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: ['regular', 'admin'],
    default: 'regular',
    required: false,
  })
  @IsOptional()
  @IsIn(['regular', 'admin'])
  role?: string;
}
