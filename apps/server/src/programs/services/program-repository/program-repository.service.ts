import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramRepositoryService {
  constructor(private prisma: PrismaService) {}

  async getPrograms() {
    return await this.prisma.program.findMany();
  }

  async getProgramById(id: number) {
    return await this.prisma.program.findUnique({ where: { id } });
  }

  async createProgram(name: string) {
    return await this.prisma.program.create({ data: { name } });
  }

  async updateProgram(id: number, newName: string) {
    return await this.prisma.program.update({
      where: { id },
      data: { name: newName },
    });
  }

  async deleteProgram(id: number) {
    return await this.prisma.program.delete({ where: { id } });
  }
}
