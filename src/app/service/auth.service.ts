import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<Boolean | User | any> =
    new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.firebase.authDomain,
      environment.firebase.apiKey
    )

  const user = this.supabase.auth.getUser();

  if (user){
    this._currentUser.next(user);
  }
  else {
    this._currentUser.next(false);
  }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN'){
        this._currentUser.next(session?.user)
      }
      else {
        this._currentUser.next(false);
        this.router.navigateByUrl("/", {replaceUrl: true});
      }
    })
  }

  signInWithEmail(email:string){
    return this.supabase.auth.signInWithOtp({
      email
    });
  }

  logOut() {
    this.supabase.auth.signOut();
  }

  get currentUser(){
    return this._currentUser.asObservable();
  }
}
