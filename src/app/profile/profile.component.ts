import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/usuario/busca/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  user: any = {};

  constructor(private http: HttpClient,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    const body = `username=${this.token.getUser().username}`;
    
    this.http.post<any>(`${AUTH_API}username`, body, httpOptions).subscribe(
      data => {
        this.user = data;
        console.log(this.user.password);
      },
      erro => {
        console.error('', erro);
      }
    );
  }
}
