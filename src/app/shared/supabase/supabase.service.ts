import { Inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import type { Database } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService extends SupabaseClient<Database> {
  constructor(
    @Inject(environment.subapaseUrl) url: string,
    @Inject(environment.supabaseKey) key: string
  ) {
    super(url, key);
    super(url, key);
  }
}
