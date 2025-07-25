import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@domain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: '+919876543210',
    description: 'Indian phone number with country code (+91)',
  })
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, {
    message:
      'Phone number must be a valid Indian mobile number with +91 country code (e.g., +919876543210)',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'betterauth_user_id_12345' })
  @IsString()
  betterAuthId: string;
}
