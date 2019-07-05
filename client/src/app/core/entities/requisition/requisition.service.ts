import { Injectable } from '@angular/core';
import { RequisitionDto } from './requisition';
import { HttpClient } from '@angular/common/http';
import { environment } from '~environments/environment.prod';
import { defaultCatch } from '~core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  baseURLEntity = `${environment.baseURL}/requisitions`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${this.baseURLEntity}/all`).pipe(defaultCatch());
  }

  findAllByRequester(requester: string) {
    return this.http.get(`${this.baseURLEntity}/all`, { headers: { requester } }).pipe(defaultCatch());
  }

  findOne(id: string) {
    return this.http.get(`${this.baseURLEntity}/get`, { headers: { id } }).pipe(defaultCatch());
  }

  addOne(requisition: RequisitionDto) {
    return this.http.post(`${this.baseURLEntity}/add`, requisition).pipe(defaultCatch());
  }

  accept(requester: string, abdicator: string) {
    return this.http.post(`${this.baseURLEntity}/accept`, { requester, abdicator }).pipe(defaultCatch());
  }
}
