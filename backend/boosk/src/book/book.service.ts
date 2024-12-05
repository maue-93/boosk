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
import { AddBookRawDto } from './dtos/add.book.raw.dto';
import { CreateAuthorsDto } from './dtos/create.authors.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(UserBook.name) private readonly userBookModel: Model<UserBook>,
  ) {}

  async findOrCreateAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
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

  async findOrCreateAuthors(
    createAuthorsDto: CreateAuthorsDto,
  ): Promise<Author[]> {
    const { authors } = createAuthorsDto;

    let authorsList: Author[] = await Promise.all(
      authors.map((author) => this.findOrCreateAuthor({ name: author })),
    );

    return authorsList;
  }

  async findOrCreateBook(createBookDto: CreateBookDto): Promise<Book> {
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
      return await this.userBookModel.create(addBookDto);
    }
    // else, return the existing userbook instance
    return userBook;
  }

  async addBookRaw(addBookRawDto: AddBookRawDto): Promise<UserBook> {
    const {
      user,
      authors,
      title,
      lastFrontMatterPage,
      readingFromPage,
      readingToPage,
      comment,
    } = addBookRawDto;

    // get the list of authors object found or created
    const authorsList = await this.findOrCreateAuthors({ authors });
    const authorIds = await Promise.all(
      authorsList.map(async (author) =>
        (await this.authorModel.findOne({ name: author }))._id.toString(),
      ),
    );

    // create or find the book
    const book = await this.findOrCreateBook({ title, authors: authorIds });

    // get book id in string
    const bookId = (
      await this.bookModel.findOne({ title: book.title })
    )._id.toString();

    // create or find the userbook
    const userbook = await this.addBook({
      user,
      book: bookId,
      lastFrontMatterPage,
      readingFromPage,
      readingToPage,
      comment,
    });

    return userbook;
  }
}
