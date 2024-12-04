import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Author } from './author.schema';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  // a list of authors
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Author.name }] })
  authors: Author[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
