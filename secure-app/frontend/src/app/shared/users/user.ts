import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { UserDto } from '../types/user-dto';
import { environment } from '../../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  // state signals
  private readonly _users = signal<UserDto[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // public readonly accessors
  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // fetch all users
  fetchAll(){
    this._loading.set(true);
    this._error.set(null);
    this.http.get<UserDto[]>(`${environment.apiUrl}/users`, { withCredentials: true })
      .pipe(catchError(err => { this._error.set('Impossible de récupérer les utilisateurs'); return of([] as UserDto[])}))
      .subscribe(res => {
        this._users.set(res ?? [])
        this._loading.set(false)
      })
  }

  // create user (returns observable)
  create(payload: { login: string, password: string }){
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(`${environment.apiUrl}/users`, payload, { withCredentials: true })
      .pipe(catchError(err => { this._error.set('Impossible de créer l\'utilisateur'); this._loading.set(false); return of(null) }))
  }

  // convenience method to refresh after create/delete
  refresh(){ this.fetchAll() }
}

