import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = `${environment.apiUrl}/Authenticate`;

  constructor(private http : HttpClient) { }

  register(payload : any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, payload)
  }

  login(payload : any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, payload)
  }

  logout() {
    localStorage.removeItem('user');
  }
}
