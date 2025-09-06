import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  hell(): string {
    return 'hell';
  }
}
