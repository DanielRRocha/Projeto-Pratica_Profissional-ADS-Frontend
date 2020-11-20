import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { AuthService } from '../_services/auth.service';

const AUTH_API = 'http://marido-aluguel-homolog.brazilsouth.cloudapp.azure.com:8080/api/usuario/busca/';
//const AUTH_API = 'http://localhost:8080/api/usuario/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient,
              private token: TokenStorageService,
              private authService: AuthService,) { }

  user: any = {};
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
    const body = `username=${this.token.getUser().username}`;
    
    this.http.post<any>(`${AUTH_API}busca/username`, body, httpOptions).subscribe(
      data => {
        this.user = data;
        console.log('Tela carregada');
      },
      erro => {
        console.error('', erro);
      }
    );
  }

  onSubmit(): void {

    // if (this.authService.comparePassword(this.user.password, this.form.password)){
      this.form.nome = this.user.nome;
      this.form.sobrenome = this.user.sobrenome;
      this.form.cpf = this.user.cpf;
      this.form.rg = this.user.rg;
      this.form.username = this.user.username;
      
      if(this.form.telefone === undefined){
        this.form.telefone = this.user.telefone;
      }
      if(this.form.cep === undefined){
        this.form.cep = this.user.cep;
      }
      if(this.form.rua === undefined){
        this.form.rua = this.user.rua;
      }
      if(this.form.numero === undefined){
        this.form.numero = this.user.numero;
      }
      if(this.form.bairro === undefined){
        this.form.bairro = this.user.bairro;
      }
      if(this.form.cidade === undefined){
        this.form.cidade = this.user.cidade;
      }
      if(this.form.estado === undefined){
        this.form.estado = this.user.estado;
      }
      if(this.form.email === undefined){
        this.form.email = this.user.email;
      }
    // } else{
    //   this.errorMessage = 'Senha invalida';
    // }
      this.authService.update(this.form).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

  userDelete(user){
    //alert('Tem certeza?');

    this.form.username = this.user.username;
    this.form.password = this.user.password;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5pZWwiLCJpYXQiOjE2MDE2ODMyNzEsImV4cCI6MTYwMTc2OTY3MX0.pSyEvczfHy52b4XPb8ZlJIX6rePps1EGw_HUVqYK9hxnqSyhMUViBE2qiStEqFK6F1e7X2uIecYmh37nTc5-xQ',
      }),
      body: {
        username: this.form.username,
        password: this.form.password,
      },
    };
    
    
    if (confirm('Tem certeza?')) {
      this.http
      .delete(`${AUTH_API}usuario/excluir`, options)
      .subscribe((s) => {
        console.log(s);
      });
      
    } else {
      alert('Ufa!');
      this.reloadPage();
    }
  }
}
