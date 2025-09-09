import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { MovieRequestSchema } from 'src/zod';

export class CreateMovieDto extends createZodDto(MovieRequestSchema) {
  @ApiProperty({
    description: 'Title of movie',
    example: '',
  })
  title: string;

  @ApiProperty({
    description: 'Title of movie',
    example: 1999,
  })
  year: number;
}
