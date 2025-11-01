import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = `${environment.apiUrl}/UsersColis`;

  constructor(private http: HttpClient) { }

  listAllClients(): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<any>(`${this.baseUrl}`, {headers});
  }
}
