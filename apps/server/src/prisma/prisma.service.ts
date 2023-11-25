import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  private readonly logger = new Logger(PrismaService.name);

  onModuleInit() {
    this.$connect()
      .then(() => {
        this.logger.debug('Prisma connected');
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected');
  }
}
