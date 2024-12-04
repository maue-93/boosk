import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Author } from './author.schema';
import { Book } from './book.schema';
import { User } from 'src/auth/schemas/user.schema';

@Schema({ timestamps: true })
export class UserBook {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  // a list of authors
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Book.name,
  })
  book: Book;

  @Prop()
  lastFrontMatterPage?: string | null;
  @Prop()
  readingFromPage?: string | number;
  @Prop({ required: true })
  readingToPage: string | number;

  @Prop()
  comment?: string;
}

export const UserBookSchema = SchemaFactory.createForClass(UserBook);
