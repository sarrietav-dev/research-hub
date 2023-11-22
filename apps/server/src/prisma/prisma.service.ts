import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  private readonly logger = new Logger(PrismaService.name);

  onModuleInit() {
    this.$connect().then(() => {
      this.logger.debug('Prisma connected');
    });
  }
}
