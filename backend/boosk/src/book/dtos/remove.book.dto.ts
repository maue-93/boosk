import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RemoveBookDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  bookId: string;
}

export class RemoveBookSansUserDto {
  @IsMongoId()
  bookId: string;
}
