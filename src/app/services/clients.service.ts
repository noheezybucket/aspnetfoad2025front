import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = `${environment.apiUrl}/UsersColis`;
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  constructor(private http: HttpClient) { }

  listAllClients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {headers: this.headers});
  }

  getClientById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {headers: this.headers});
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/client`, client, {headers: this.headers});
  }

  updateClient(id:any, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload, {headers: this.headers});
  }
}
