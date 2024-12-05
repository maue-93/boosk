import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Author } from './schemas/author.schema';
import { User } from 'src/auth/schemas/user.schema';
import { CreateBookDto } from './dtos/create.book.dto';
import { CreateAuthorDto } from './dtos/create.author.dto';
import { AddBookDto } from './dtos/add.book.dto';
import { UserBook } from './schemas/user.book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(UserBook.name) private readonly userBookModel: Model<UserBook>,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { name } = createAuthorDto;

    // check if the author already exist in the database
    const author = await this.authorModel.findOne({ name });
    // if the author is a new author, create one
    if (!author) {
      return await this.authorModel.create({ name });
    }
    // else, return the existing author
    return author;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, authors } = createBookDto;

    // check if the book already exist in the database
    const book = await this.bookModel.findOne({ title });
    // if the book is a new author, create one
    if (!book) {
      return await this.bookModel.create(createBookDto);
    }
    // else, return the existing book
    return book;
  }

  async addBook(addBookDto: AddBookDto): Promise<UserBook> {
    const { user, book } = addBookDto;

    /* 
      userbook is just the link between a user and the book they are reading.
      this is because a book info does not belong to anyone, but when a user reads the book, 
      we create an association of them and the book, we call this userbook
    */

    // check if the userbook already exist in the database
    const userBook = await this.userBookModel.findOne({ user, book });
    // if the book is a new author, create one
    if (!userBook) {
      return await this.userBookModel.create({ user, book });
    }
    // else, return the existing userbook instance
    return userBook;
  }
}
