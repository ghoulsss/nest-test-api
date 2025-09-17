import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [MoviesModule, DatabaseModule, MinioClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
