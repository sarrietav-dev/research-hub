import { Inject, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService extends SupabaseClient {
  constructor(
    @Inject(environment.subapaseUrl) url: string,
    @Inject(environment.supabaseKey) key: string
  ) {
    super(url, key);
    super(url, key);
  }
}
