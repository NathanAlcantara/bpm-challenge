import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '~environments/environment';
import { defaultCatch } from '~core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findOne(id: string) {
    return this.http.get(`${environment.baseURL}/users/get`, { headers: { id } }).pipe(defaultCatch());
  }
}
