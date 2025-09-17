import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MinioClientService {
  private minioClient: Client;
  private bucketName: string;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
    this.bucketName = 'files';
  }

  async uploadFile(
    prefix: string,
    file: Express.Multer.File,
  ): Promise<{
    objUrl: string;
    originalname: string;
    extention: string;
    mimetype: string;
    minioId: number;
    bucket: string;
  }> {
    const decodeName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const minioId = 1;
    const extention = decodeName.split('.').reverse()[0];
    const fileName = [prefix, `${randomUUID()}.${extention}`].join('/');
    const mimetype = file.mimetype;

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
    );
    return {
      objUrl: fileName,
      originalname: decodeName,
      extention,
      mimetype,
      minioId,
      bucket: this.bucketName,
    };
  }
"typescript.updateImportsOnFileMove.enabled": "always",
  //   /**
  //  * Скачивание файла
  //  * @param bucket
  //  * @param path
  //  * @returns
  //  */
  // async downloadFile(bucket: string, path: string): Promise<Buffer> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const dataStream = await this.minioClient.getObject(bucket, path);
  //       const chunks: Buffer[] = [];

  //       dataStream.on('data', (chunk: Buffer) => chunks.push(chunk));
  //       dataStream.on('end', () => resolve(Buffer.concat(chunks)));
  //       dataStream.on('error', reject);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  async deleteFile(fileName: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }

  async createBucket(bucketName: string): Promise<void> {
    await this.minioClient.makeBucket(bucketName, 'us-east-1');
  }
}
