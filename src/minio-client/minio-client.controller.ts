import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from './minio-client.service';

@Controller('minio-client')
export class MinioClientController {
  constructor(private readonly minioService: MinioClientService) {}

  @Post('uploadFile')
  @ApiOperation({ summary: 'Добавление фильма' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 50,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const prefix = 'photos';
    await this.minioService.uploadFile(prefix, file);
  }

  // @Delete(":id")
  // async remove(id: int): {
  //   await this.minioService.deleteFile()
  // }
}
