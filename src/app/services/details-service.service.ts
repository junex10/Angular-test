import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService {

  constructor(private http: HttpClient) {
    console.log('3 servicio funcionando')
  }
  getDetails(id):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/Json')
    return this.http.get<any>(`/api/${id}`, {
      headers: header
    });
    }
}
