import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Author } from './schemas/author.schema';
import { User } from 'src/auth/schemas/user.schema';
import { CreateAuthorDto } from './dtos/create.author.dto';
import { AddBookDto, AddBookRawDto } from './dtos/add.book.dto';
import { CreateAuthorsDto } from './dtos/create.authors.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
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

  async addBook(addBookRawDto: AddBookRawDto): Promise<Book> {
    const {
      user,
      title,
      authors,
      lastFrontMatterPage,
      readingFromPage,
      readingToPage,
      comment,
    } = addBookRawDto;

    // check if the user already has it
    const book = await this.bookModel.findOne({ user, title });
    if (book) {
      return book;
    }

    // get the list of authors object found or created
    const authorsList = await this.findOrCreateAuthors({ authors });

    const authorIds = await Promise.all(
      authorsList.map(async (author) => {
        const authorObj = await this.authorModel.findOne({ name: author.name });
        return authorObj._id.toString();
      }),
    );

    // the data with the authors ids
    const addBookDto: AddBookDto = {
      user,
      title,
      authors: authorIds,
      lastFrontMatterPage,
      readingFromPage,
      readingToPage,
      comment,
    };

    // create the book
    const newBook: Book = await this.bookModel.create(addBookDto);

    return newBook;
  }
}
