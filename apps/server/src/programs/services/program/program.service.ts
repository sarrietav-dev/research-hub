import { Injectable } from '@nestjs/common';
import { ProgramRepositoryService } from '../program-repository/program-repository.service';
import { Program } from '@/programs/domain/Program';

@Injectable()
export class ProgramService {
  constructor(private programRepository: ProgramRepositoryService) {}

  async getPrograms(): Promise<Program[]> {
    return this.programRepository.getPrograms();
  }

  async getProgramById(id: number): Promise<Program | null> {
    return this.programRepository.getProgramById(id);
  }

  async createProgram(name: string) {
    return await this.programRepository.createProgram(name);
  }

  async updateProgram(id: number, newName: string) {
    return await this.programRepository.updateProgram(id, newName);
  }

  async deleteProgram(id: number) {
    return await this.programRepository.deleteProgram(id);
  }
}
