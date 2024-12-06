import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticatedRequest } from 'src/auth/types/authenticated.request.type';
import { JwtPayloadType } from 'src/auth/types/jwt.payload.type';
import {
  AddBookDto,
  AddBookRawDto,
  AddBookRawSansUserDto,
} from './dtos/add.book.dto';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  addBookRaw(
    @Body() addBookRawSansUserDto: AddBookRawSansUserDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Book> {
    // get user from request header
    const user: JwtPayloadType = request.user;
    // add user to the dto and create the book
    const addBookRawDto: AddBookRawDto = {
      user: user.id,
      ...addBookRawSansUserDto,
    };
    return this.bookService.addBook(addBookRawDto);
  }
}
