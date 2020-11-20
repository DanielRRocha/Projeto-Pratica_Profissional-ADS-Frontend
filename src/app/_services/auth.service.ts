import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://marido-aluguel-homolog.brazilsouth.cloudapp.azure.com:8080/api/auth/';
const AUTH_API_ = 'http://marido-aluguel-homolog.brazilsouth.cloudapp.azure.com:8080/api/usuario/';
//const AUTH_API = 'http://localhost:8080/api/auth/';
//const AUTH_API_ = 'http://localhost:8080/api/usuario/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(`${AUTH_API}signin`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    // console.log(user.role);
    return this.http.post(`${AUTH_API}signup`, {
      username: user.username,
      email: user.email,
      password: user.password,
      nome: user.nome,
      sobrenome: user.sobrenome,
      cpf: user.cpf,
      rg: user.rg,
      telefone: user.telefone,
      cep: user.cep,
      rua: user.rua,
      numero: user.numero,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado,
      role: [user.role]
    }, httpOptions);
  }

  update(user): Observable<any> {
    return this.http.put(`${AUTH_API_}alterar`, {
      username: user.username,
      email: user.email,
      password: user.password,
      nome: user.nome,
      sobrenome: user.sobrenome,
      cpf: user.cpf,
      rg: user.rg,
      telefone: user.telefone,
      cep: user.cep,
      rua: user.rua,
      numero: user.numero,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado
    }, httpOptions);
  }

  // comparePassword(passwordDB, passwordFRont): boolean {
  //   const result = this.http.post(`${AUTH_API}comparePassword`, {
  //     passwordDb: passwordDB,
  //     passwordFront: passwordFRont
  //   }, httpOptions);
  //   console.log(result);
  //   if(result === "true"){
  //     console.log('true');
  //     return true;
  //   }
  //   // console.log(result);
  //   console.log('false');
  //   return false;
  // }
}
