import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://marido-aluguel-homolog.brazilsouth.cloudapp.azure.com:8080/api/test/';
//const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${API_URL}all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${API_URL}user`, { responseType: 'text' });
  }

  getProfessionalBoard(): Observable<any> {
    return this.http.get(`${API_URL}prof`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${API_URL}admin`, { responseType: 'text' });
  }
}
