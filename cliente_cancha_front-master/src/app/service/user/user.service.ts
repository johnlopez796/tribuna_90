import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/internal/operators/retry';
import { Usuario } from 'src/app/model/usuario/Usuario';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { Ingreso } from 'src/app/model/usuario/ingreso';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlIngreso = environment.apiIngreso;
  private urlRegistrar = environment.apiIngreso + '/registro';
  private httpOptions = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };

  constructor(private http: HttpClient,
      private alertaService:AlertaService) { }

  registroUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlRegistrar,usuario,this.httpOptions);
  }

  login(ingreso:Ingreso):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlIngreso,ingreso,this.httpOptions);
  }

  validarSesion():boolean{
    var token =sessionStorage.getItem("token");
    if(token){
      return true;
    }
    return false;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("error ->"+operation);
      return of(result as T);
    };
  }
}
