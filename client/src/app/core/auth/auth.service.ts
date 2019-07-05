import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '~environments/environment';
import { defaultCatch } from '~core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.baseURL}/auth/login`, { username: username, password: password }).pipe(defaultCatch());
  }
}
