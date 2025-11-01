import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ColisService {
  private baseUrl = `${environment.apiUrl}/Colis`;
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  constructor(
    private http : HttpClient
  ) { }

  getAllColis(){
    return this.http.get<any>(`${this.baseUrl}`, {headers: this.headers});
  }

  createColis(payload:any){
    return this.http.post<any>(`${this.baseUrl}`, payload, {headers: this.headers});
  }
}
