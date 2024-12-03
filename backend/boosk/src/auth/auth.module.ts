import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ACCESS_JWT_SERVICE,
  REFRESH_JWT_SERVICE,
} from './constants/jwt.service.names';

@Module({
  imports: [
    // connect the app with mongodb's users collection that follows the userSchema
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    // seting up the authentication handler
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,

    // JWT Service for the access token
    {
      provide: ACCESS_JWT_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: configService.get<string | number>('JWT_ACCESS_EXPIRES'),
          },
        });
      },
      inject: [ConfigService],
    },

    // JWT Service for the refresh token
    {
      provide: REFRESH_JWT_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
          signOptions: {
            expiresIn: configService.get<string | number>(
              'JWT_REFRESH_EXPIRES',
            ),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
