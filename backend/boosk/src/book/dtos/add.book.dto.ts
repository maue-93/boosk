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

export class AddBookRawDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatterPage?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsRomanOrNumber()
  readingToPage: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class AddBookRawSansUserDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatterPage?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsRomanOrNumber()
  readingToPage: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class AddBookDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsMongoId({ each: true })
  authors: string[];

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatterPage?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsRomanOrNumber()
  readingToPage: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}
