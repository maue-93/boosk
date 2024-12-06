import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Author } from './author.schema';
import { User } from 'src/auth/schemas/user.schema';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  // a list of authors
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Author.name }] })
  authors: Author[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ required: false })
  lastFrontMatterPage?: string;
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  readingFromPage?: string | number;
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  readingToPage: string | number;

  @Prop()
  comment?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
