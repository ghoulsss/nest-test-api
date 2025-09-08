import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Поиск фильмов по году и названию' })
  @ApiParam({ name: 'movieName', required: false, description: 'Name of film' })
  // @ApiParam({ year: 'movieYear', required: false, description: 'Year of film' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  find(@Query('year') movieYear?: string, @Query('title') title?: string) {
    const params = { movieYear: Number(movieYear), title };
    return this.moviesService.find(params);
  }

  @Post()
  @ApiOperation({ summary: 'Добавление фильма' })
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Get()
  @ApiOperation({ summary: 'Вывести все фильмы' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Вывести фильм по id' })
  @ApiParam({
    name: 'movieId',
    required: false,
    description: 'Film identifier',
  })
  findOne(@Param('id') id: string) {
    // const movie = this.moviesService.findOne(id);
    return this.moviesService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменить информацию о фильме' })
  update(@Param('id') id: string, @Body() updatedData: UpdateMovieDto) {
    return this.moviesService.update(Number(id), updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить фильм' })
  remove(@Param('id') id: number) {
    return this.moviesService.remove(+id);
  }
}
