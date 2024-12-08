import { Type } from 'class-transformer';
import { IsArray, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { IsRomanOrNumber } from 'src/book/validators/book.dto.validators';

export class RecordedSessionDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  book: string;

  @IsArray()
  @Type(() => Date)
  @IsDate({ each: true })
  time: Date[];

  @IsRomanOrNumber()
  lastPage: string | number;
}
