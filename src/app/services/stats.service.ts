import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environment/environment';

export interface StatsData {
  colis: {
    total: number;
    enAttente: number;
    enCours: number;
    livre: number;
    annule: number;
  };
  livraisons: {
    total: number;
    enCours: number;
    terminee: number;
    annulee: number;
  };
  clients: {
    total: number;
    actif: number;
    inactif: number;
  };
  livreurs: {
    total: number;
    actif: number;
    inactif: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseUrl = `${environment.apiUrl}/Dashboard`;
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  constructor(private http: HttpClient) {}

  getStats(): Observable<StatsData> {
    return this.http.get<StatsData>(this.baseUrl, {headers: this.headers});
  }
}
