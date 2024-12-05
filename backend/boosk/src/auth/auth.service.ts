import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  ACCESS_JWT_SERVICE,
  REFRESH_JWT_SERVICE,
} from './constants/jwt.service.names';
import { SignUpDto } from './dtos/signup.dto';
import { LogInDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/changepassword.dto';
import { JwtPayloadType } from './types/jwt.payload.type';

@Injectable()
export class AuthService {
  constructor(
    // making a handshake with the mongoose users collection we describe in auth module
    // userModel now represents the users collection, can find, add, delete, edit
    @InjectModel(User.name) private userModel: Model<User>,

    @Inject(ACCESS_JWT_SERVICE) private accessJwtService: JwtService,
    @Inject(REFRESH_JWT_SERVICE) private refreshJwtService: JwtService,
  ) {}

  // create a user account
  async singUp(
    signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { firstName, lastName, email, password } = signUpDto;

    // why 10? because it's common. Should we optimize this?
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // get accessToken and refreshToken
    const accessToken = this.accessJwtService.sign({ id: user._id });
    const refreshToken = this.refreshJwtService.sign({ id: user._id });

    return { accessToken, refreshToken };
  }

  // log in
  async logIn(
    logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = logInDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(`No account with this email`);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Wrong password`);
    }

    // get accessToken and refreshToken
    const payload: JwtPayloadType = { id: user.id, email };
    const accessToken = this.accessJwtService.sign(payload);
    const refreshToken = this.refreshJwtService.sign(payload);

    return { accessToken, refreshToken };
  }

  // change password
  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { email, currentPassword, newPassword } = changePasswordDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(`No account with this email`);
    }

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Current password`);
    }

    // why 10? because it's common. Should we optimize this?
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
    return { message: 'Password updated successfully' };
  }
}
