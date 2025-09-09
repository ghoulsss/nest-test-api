import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/database/prisma.service';
import { MovieResponseSchema } from 'src/zod';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: { movieYear?: number; title?: string }) {
    const { movieYear, title } = params;
    const movie = await this.prisma.movie.findMany({
      where: {
        year: movieYear,
        title: title ? { contains: title } : undefined,
      },
    });
    return movie;
  }

  async create(movieData: CreateMovieDto) {
    await this.prisma.movie.create({
      data: {
        ...movieData,
      },
    });
  }

  async findAll(isAsc: boolean) {
    console.log(isAsc);
    const orderingAsc = isAsc ? 'asc' : 'desc';
    console.log(orderingAsc);
    const movies = await this.prisma.movie.findMany({
      orderBy: {
        year: orderingAsc,
      },
    });
    return movies;
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findMany({
      where: {
        id: id,
      },
    });
    return movie;
  }

  async update(id: number, movieData: UpdateMovieDto) {
    const updateMovie = await this.prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        ...movieData,
      },
    });
    return updateMovie;
  }

  remove(id: number) {
    return this.prisma.movie.delete({
      where: {
        id: id,
      },
    });
  }
}
