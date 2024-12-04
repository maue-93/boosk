import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  // the fullName property id defaulted to firstName + lastName
  @Prop({
    default: function (this: User) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  fullName?: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
