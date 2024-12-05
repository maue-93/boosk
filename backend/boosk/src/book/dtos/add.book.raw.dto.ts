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

export class AddBookRawWithUserDto extends AddBookRawDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;
}

// const a = {
//   "title": "a new book",

//   "authors": ["eliso", "Paige Emma Knight Lavelanet" ,"Rober Greene", "Dag Hedward-Mills"],

//   "lastFrontMatterPage": "ix",

//   "readingFromPage": 7,

//   "readingToPage": 200,

//   "comment": ""
// }
