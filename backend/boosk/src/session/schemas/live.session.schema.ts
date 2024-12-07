import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';

@Schema({ timestamps: true })
export class LiveSession {
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

  // might not even need this, can be reserved for recorded session
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  lastPage: string | number;
}

export const LiveSessionSchema = SchemaFactory.createForClass(LiveSession);
