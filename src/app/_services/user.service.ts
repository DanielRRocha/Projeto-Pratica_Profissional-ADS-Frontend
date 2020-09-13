import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://ec2-13-52-253-236.us-west-1.compute.amazonaws.com:8080/api/test/';

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
