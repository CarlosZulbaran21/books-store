import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  pages: number;

  @Prop()
  image_url: string;

  @Prop([String])
  keywords: string[];

  @Prop([CommentSchema])
  comments: Comment[];

  @Prop()
  visits: number = 0;
}

export const BookSchema = SchemaFactory.createForClass(Book);
