import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';

export class CreateCommentDto {
  @ApiProperty({ example: 'Esperaba más' })
  readonly title?: string;

  @ApiProperty({
    example:
      'Nisi officia fugiat id nulla laboris ex. Sit laboris culpa occaecat occaecat aliquip dolor non excepteur reprehenderit.',
  })
  readonly comment: string;

  @ApiProperty({ example: 'johndoe' })
  readonly username: User;

  @ApiProperty({ example: 2 })
  readonly likes: number;

  @ApiProperty({ example: 23 })
  readonly dislikes: number;

  @ApiProperty({ example: new Date() })
  readonly createAt: Date = new Date();
}
