import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail() readonly email: string;

  @IsString() readonly currentPassword: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number.' })
  @Matches(/[@$!%*?&]/, {
    message:
      'Password must contain at least one special character (@, $, !, %, *, ?, &).',
  })
  readonly newPassword: string;
}
