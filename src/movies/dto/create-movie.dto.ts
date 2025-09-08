import { createZodDto } from 'nestjs-zod';
import { MovieRequestSchema } from 'src/zod';

export class CreateMovieDto extends createZodDto(MovieRequestSchema) {}
