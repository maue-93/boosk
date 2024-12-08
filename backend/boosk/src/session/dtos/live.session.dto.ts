import { Type } from 'class-transformer';
import { IsArray, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { IsRomanOrNumber } from 'src/book/validators/book.dto.validators';

export class LiveSessionDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  book: string;

  @IsArray()
  @Type(() => Date)
  @IsDate({ each: true })
  time: Date[];

  @IsOptional()
  @IsRomanOrNumber()
  lastPage?: string | number;
}

export class StartLiveSessionDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  book: string;
}

export class StartLiveSessionSansUserDto {
  @IsMongoId()
  book: string;
}

export class PauseLiveSessionDto {
  @IsMongoId()
  user: string;
}

export class FinishSessionDto {
  @IsMongoId()
  user: string;

  @IsOptional()
  @IsRomanOrNumber()
  lastPage?: string | number;
}

export class FinishSessionSansUserDto {
  @IsOptional()
  @IsRomanOrNumber()
  lastPage?: string | number;
}
