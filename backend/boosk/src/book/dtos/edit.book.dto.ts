import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IsRomanOrNumber } from '../validators/book.dto.validators';

export class EditBookDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  bookId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  authors?: string[];

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatterPage?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsOptional()
  @IsRomanOrNumber()
  readingToPage?: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class EditBookSanUserDto {
  @IsMongoId()
  bookId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  authors?: string[];

  @IsOptional()
  @IsString()
  @Matches(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i, {
    message: 'lastFrontMatterPage must be a valid Roman numeral',
  })
  lastFrontMatterPage?: string;

  @IsOptional()
  @IsRomanOrNumber()
  readingFromPage?: string | number;

  @IsOptional()
  @IsRomanOrNumber()
  readingToPage?: string | number;

  @IsOptional()
  @IsString()
  comment?: string;
}
