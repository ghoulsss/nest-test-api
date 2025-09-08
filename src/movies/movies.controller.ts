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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  find(@Query('year') movieYear?: string, @Query('title') title?: string) {
    const params = { movieYear: Number(movieYear), title };
    return this.moviesService.find(params);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // const movie = this.moviesService.findOne(id);
    return this.moviesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedData: UpdateMovieDto) {
    return this.moviesService.update(Number(id), updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(+id);
  }
}
