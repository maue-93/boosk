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

  @Prop({
    type: Number,
    default: function () {
      if (this.time && this.time.length > 1) {
        return this.time.reduce(
          (sum: number, date: Date, index: number, array: Date[]) => {
            // Only process every second item (pairing)
            if (index % 2 === 1) {
              const prevDate = new Date(array[index - 1]);
              return sum + (new Date(date).getTime() - prevDate.getTime());
            }
            return sum;
          },
          0,
        );
      }
      return 0; // Default to 0 if no valid time array
    },
  })
  duration: number;
}

export const RecordedSessionSchema =
  SchemaFactory.createForClass(RecordedSession);
