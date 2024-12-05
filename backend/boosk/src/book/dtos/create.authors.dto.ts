import { IsArray, IsString } from 'class-validator';

export class CreateAuthorsDto {
  @IsArray()
  @IsString({ each: true })
  authors: string[];
}
