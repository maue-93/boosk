import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Author } from './schemas/author.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}
}
