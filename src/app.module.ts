import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MoviesModule, DatabaseModule],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
