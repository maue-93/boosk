import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
