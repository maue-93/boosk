import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';
import { PassportModule } from '@nestjs/passport';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    AuthModule,

    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema },
    ]),

    // seting up the authentication handler
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
