import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  title: string;

  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  username: User;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop()
  createAt: Date = new Date();
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
