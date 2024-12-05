import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsMongoId({ each: true })
  authors: string[];
}
