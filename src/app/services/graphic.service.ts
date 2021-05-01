import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  constructor(private http: HttpClient) { }

  getDetails(id):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/Json')
    return this.http.get<any>(`/api/${id}`, {
      headers: header
    });
    }
}
