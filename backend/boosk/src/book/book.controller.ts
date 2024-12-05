import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { UserBook } from './schemas/user.book.schema';
import { AuthGuard } from '@nestjs/passport';
import { AddBookRawDto } from './dtos/add.book.raw.dto';

import { AuthenticatedRequest } from 'src/auth/types/authenticated.request.type';
import { JwtPayloadType } from 'src/auth/types/jwt.payload.type';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('addraw')
  @UseGuards(AuthGuard('jwt'))
  addBookRaw(
    @Body() addBookRawDto: AddBookRawDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<UserBook> {
    const user: JwtPayloadType = request.user;
    return this.bookService.addBookRaw({ user: user.id, ...addBookRawDto });
  }
}
