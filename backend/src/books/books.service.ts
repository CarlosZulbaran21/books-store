import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return (
      this.bookModel
        .find()
        // .populate({ path: 'comments.username' })
        .exec()
    );
  }

  async findOne(id: string): Promise<Book> {
    return (
      this.bookModel
        .findOne({ _id: id })
        // .populate({ path: 'comments.username' })
        .exec()
    );
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findOneAndUpdate({ _id: id }, updateBookDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bookModel.deleteOne({ _id: id }).exec();
  }

  async addComment(id: string, comment: any) {
    const book: BookDocument = await this.bookModel.findById(id);
    book.comments.push(comment);
    book.save();
    return book;
  }

  async addCommentDislikes(bookId: string, commentId: string) {
    if (isValidObjectId(commentId)) {
      const book: BookDocument = await this.bookModel.findById(bookId);

      if (book) {
        const comment = book.comments.find(
          (c) => c['_id'].toString() === commentId,
        );

        if (comment) {
          comment.dislikes++;
          await book.save();
          return book;
        }
      }
    }
  }

  async addCommentLikes(bookId: string, commentId: string) {
    if (isValidObjectId(commentId)) {
      const book: BookDocument = await this.bookModel.findById(bookId);

      if (book) {
        const comment = book.comments.find(
          (c) => c['_id'].toString() === commentId,
        );

        if (comment) {
          comment.likes++;
          await book.save();
          return book;
        }
      }
    }
  }

  async addBooksVisits(id: string) {
    const book: BookDocument = await this.bookModel.findById(id);
    book.visits++;
    book.save();
    return book;
  }

  async filterBookByGenre(genre: string) {
    return this.bookModel.find({
      genre: {
        $regex: genre,
      },
    });
  }
}
