import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { AuthService } from '../_services/auth.service';

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

  constructor(private http: HttpClient,
              private token: TokenStorageService,
              private authService: AuthService) { }

  user: any = {};
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
    const body = `username=${this.token.getUser().username}`;
    
    this.http.post<any>(`${AUTH_API}username`, body, httpOptions).subscribe(
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
}
