import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidObjectId(id)) return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isValidObjectId(id)) return this.booksService.remove(id);
  }

  @Post(':id/comment')
  async addComment(@Param('id') id: string, @Body() comment: CreateCommentDto) {
    if (isValidObjectId(id)) return this.booksService.addComment(id, comment);
  }

  @Patch('/comment/dislike')
  async addCommentDislikes(
    @Query('bookId') bookId: string,
    @Query('commentId') commentId: string,
  ) {
    if (isValidObjectId(bookId && commentId))
      return this.booksService.addCommentDislikes(bookId, commentId);
  }

  @Patch('/comment/like')
  async addCommentLikes(
    @Query('bookId') bookId: string,
    @Query('commentId') commentId: string,
  ) {
    if (isValidObjectId(bookId && commentId))
      return this.booksService.addCommentLikes(bookId, commentId);
  }

  @Patch('/visits/:id')
  async addBooksVisits(@Param('id') id: string) {
    if (isValidObjectId(id)) return this.booksService.addBooksVisits(id);
  }

  @Get('/filter/genre/:genre')
  async filterBookByGenre(@Param('genre') genre: string) {
    return this.booksService.filterBookByGenre(genre);
  }
}
