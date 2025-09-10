import { Module } from '@nestjs/common';
import { MinioController } from './minio.controller';

@Module({
  controllers: [MinioController],
})
export class MinioModule {}
