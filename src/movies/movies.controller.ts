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
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Поиск фильмов по году и названию' })
  // @ApiParam({ name: 'title', description: 'Name of film' }) // required: false
  // @ApiParam({ name: 'year', description: 'Year of film' }) // required: false
  // @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  find(@Query('year') movieYear?: string, @Query('title') title?: string) {
    const params = { movieYear: Number(movieYear), title };
    return this.moviesService.find(params);
  }

  @Post()
  @ApiOperation({ summary: 'Добавление фильма' })
  @ApiBody({ type: [CreateMovieDto] })
  @ApiCreatedResponse({
    description: 'The movie has been successfully created.',
  })
  // @ZodSerializerDto(CreateMovieDto)
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Get()
  @ApiOperation({ summary: 'Вывести все фильмы' })
  @ApiOkResponse({
    description: 'Success list of books',
    type: CreateMovieDto,
    isArray: true,
  })
  findAll(@Query('orderByAsc') orderByAsc?: string) {
    console.log(typeof(orderByAsc), orderByAsc);
    const isAsc = orderByAsc?.toLowerCase() === 'true' || orderByAsc === '1';
    console.log(isAsc);

    // const orderingAsc = orderByAsc ? 'asc' : 'desc';
    return this.moviesService.findAll(Boolean(isAsc));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Вывести фильм по id' })
  @ApiParam({
    name: 'id',
    description: 'Id фильма',
  })
  findOne(@Param('id') id: number) {
    // const movie = this.moviesService.findOne(id);
    return this.moviesService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Id фильма',
    type: CreateMovieDto,
  })
  @ApiOperation({ summary: 'Изменить информацию о фильме' })
  update(@Param('id') id: number, @Body() updatedData: UpdateMovieDto) {
    return this.moviesService.update(Number(id), updatedData);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id фильма',
  })
  @ApiOperation({ summary: 'Удалить фильм' })
  @ApiOkResponse({
    description: 'Success deleted',
  })
  remove(@Param('id') id: number) {
    return this.moviesService.remove(Number(id));
  }
}
