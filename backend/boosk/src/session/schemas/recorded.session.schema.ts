import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';

@Schema({ timestamps: true })
export class RecordedSession {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Book.name,
  })
  book: Book;

  @Prop({ required: true, type: [{ type: Date }] })
  time: Date[];

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  lastPage: string | number;
}

export const RecordedSessionSchema =
  SchemaFactory.createForClass(RecordedSession);
