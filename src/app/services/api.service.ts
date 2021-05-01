import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjToArrayPipe } from '../obj-to-array.pipe'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor( private http: HttpClient ) {
    console.log('Servicio funcionando')
   }

  getAll():Observable<any>{
  let header = new HttpHeaders()
  .set('Type-content', 'aplication/Json')
  return this.http.get<any>('/api', {
    headers: header
  });
  }
}
