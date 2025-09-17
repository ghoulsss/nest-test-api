import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioClientController } from './minio-client.controller';

@Module({
  providers: [MinioClientService],
  exports: [MinioClientService],
  controllers: [MinioClientController],
})
export class MinioClientModule {}
