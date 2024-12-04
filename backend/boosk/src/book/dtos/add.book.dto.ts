import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IsRomanOrNumber } from '../validators/book.dto.validators';

export class AddBookDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string; // MongoDB ObjectId for User

  @IsMongoId()
  @IsNotEmpty()
  book: string; // MongoDB ObjectId for Book

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatter?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsNumber()
  @IsRomanOrNumber()
  readingToPage: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}
