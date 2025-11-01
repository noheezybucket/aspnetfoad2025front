import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreursService {
  private baseUrl = `${environment.apiUrl}/UsersColis`;
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  constructor(private http: HttpClient) { }

  listAllLivreurs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {headers: this.headers});
  }

  createLivreur(livreur: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/livreur`, livreur, {headers: this.headers});
  }
}
