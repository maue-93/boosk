import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { RemoveBookDto, RemoveBookSansUserDto } from './dtos/remove.book.dto';
import { EditBookDto, EditBookSanUserDto } from './dtos/edit.book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  addBookRaw(
    @Req() request: AuthenticatedRequest,
    @Body() addBookRawSansUserDto: AddBookRawSansUserDto,
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

  @Patch('edit')
  @UseGuards(AuthGuard('jwt'))
  editBook(
    @Req() request: AuthenticatedRequest,
    @Body() editBookSansUserDto: EditBookSanUserDto,
  ): Promise<Book> {
    const user: JwtPayloadType = request.user;
    const editBookDto: EditBookDto = { user: user.id, ...editBookSansUserDto };
    return this.bookService.editBook(editBookDto);
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  removeBook(
    @Req() request: AuthenticatedRequest,
    @Body() removeBookSansUserDto: RemoveBookSansUserDto,
  ): Promise<{ message: string }> {
    // get user from request header
    const user: JwtPayloadType = request.user;
    const { bookId } = removeBookSansUserDto;
    const removeBookDto: RemoveBookDto = { user: user.id, bookId };

    return this.bookService.removeBook(removeBookDto);
  }
}
