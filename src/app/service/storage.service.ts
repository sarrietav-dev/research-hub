import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;
  private info = 'NO-ME-SE-EL-NOMBRE-DE-LA-TABLA'; 
  public data: any[] = [];

  constructor() {
    this.supabase = createClient(
      environment.firebase.authDomain,
      environment.firebase.apiKey
    );

    this.loadData();
  }

  private loadData() {
    this.supabase.from(this.info).select('*').then(({ data, error }) => {
      if (error) {
        console.error('Error al cargar datos:', error);
        return;
      }

      this.data = data;
    });
  }

  getData(): any[] {
    return this.data;
  }

  addToData(newData: any): void {
    this.supabase
      .from(this.info)
      .upsert([newData])
      .then(({ error }) => {
        if (error) {
          console.error('Error al agregar datos:', error);
          return;
        }

        this.loadData();
      });
  }

  deleteData(id: number): void {
    this.supabase
      .from(this.info)
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Error al eliminar datos:', error);
          return;
        }

        this.loadData();
      });
  }
}
