import { Controller, Inject } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';

@Controller('minio')
export class MinioController {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}
}
