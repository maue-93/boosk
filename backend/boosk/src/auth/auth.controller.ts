import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LogInDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/changepassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // create a user account
  @Post('signup')
  signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.singUp(signUpDto);
  }

  @Get('login')
  logIn(
    @Body() logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.logIn(logInDto);
  }

  @Patch('changepassword')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.changePassword(changePasswordDto);
  }
}
