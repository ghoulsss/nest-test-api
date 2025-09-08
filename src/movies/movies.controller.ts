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
  find(@Query('name') movieName: string) {
    return this.moviesService.find(movieName);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // ((@Body() createMovieDto: CreateMovieDto)
    return this.moviesService.create(movieData);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedData: UpdateMovieDto) {
    return this.moviesService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(+id);
  }
}
