import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    // make ConfigModule available globally and tell the app where the config file is
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    // connect to the mongodb database
    MongooseModule.forRootAsync({
      // we need to get the path to the database from our config module
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,

    BookModule,

    SessionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
