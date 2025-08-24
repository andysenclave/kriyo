import { ApiPropertyOptional } from '@nestjs/swagger';

class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe',
  })
  name?: string;
}

export default UpdateUserDto;
