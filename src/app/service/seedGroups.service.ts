import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { SupabaseService } from '../shared/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SeedGroups {
  private info = 'NO-ME-SE-EL-NOMBRE-DE-LA-TABLA';
  public data: any[] = [];

  constructor(private supabase: SupabaseService) {}

  getResearchersFromMinCiencias() {}

  getStudentsInProjects() {}

  getStudentsInSeedGroups() {}

  getTeachersInSeedGroupsByYear() {}

  getTeachersInSeedGroupsByAcademicTerm() {}

  getTeachersInSeedGroupsByProgram() {}

  getStudentsInSeedGroupsByYear() {}

  getStudentsInSeedGroupsByProgram() {}

  getStudentsInResearchProjects() {}

  findResearchContributionsByStudents() {}

  findResearchContributionsByTeachers() {}

  getStudentsAndFunctions() {}

  getSeedGroupReseachTracks() {}

  getFinishedProductsByYear() {}

  getCurrentProductsByYear() {}
}
