import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivraisonsService {

  private baseUrl = `${environment.apiUrl}/Livraison`;
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  constructor(
    private http : HttpClient
  ) { }

  listAllLivraisons(){
    return this.http.get<any>(`${this.baseUrl}`, {headers: this.headers});
  }

  createLivraison(payload:any){
    return this.http.post<any>(`${this.baseUrl}`, payload,{headers: this.headers});
  }

  finishLivraison(id:any){
    return this.http.patch<any>(`${this.baseUrl}/${id}/terminer`,{headers: this.headers});
  }


}
