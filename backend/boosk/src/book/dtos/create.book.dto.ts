import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsMongoId({ each: true })
  authors: string[];
}
