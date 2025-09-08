import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
// import { Movie } from './entities/movie.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async find(movieName: string) {
    const movie = await this.prisma.movie.findMany({
      where: {
        title: movieName,
      },
    });
    return movie;
  }

  async create(movieData: CreateMovieDto) {
    //createMovieDto: CreateMovieDto
    await this.prisma.movie.create({
      data: {
        ...movieData,
      },
    });
  }

  async findAll() {
    const movies = await this.prisma.movie.findMany();
    return movies;
  }

  findOne(id: number) {
    return this.prisma.movie.findMany({
      where: {
        id: id,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return this.prisma.movie.delete({
      where: {
        id: id,
      },
    });
  }
}
