import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';
import { PassportModule } from '@nestjs/passport';
import { Book, BookSchema } from './schemas/book.schema';
import { UserBook, UserBookSchema } from './schemas/user.book.schema';

@Module({
  imports: [
    AuthModule,

    // connect the app with mongodb's authors collection that follows the AuthorSchema
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),

    // connect the app with mongodb's books collection that follows the BookSchema
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),

    // connect the app with mongodb's userbooks collection that follows the UserBookSchema
    // UserBook model is the link of a certain user to the book they read
    MongooseModule.forFeature([
      { name: UserBook.name, schema: UserBookSchema },
    ]),

    // seting up the authentication handler
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}