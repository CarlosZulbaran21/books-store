import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  title?: string;

  @Prop()
  comment: string;

  @Prop()
  username: string;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop()
  createAt: Date = new Date();
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
