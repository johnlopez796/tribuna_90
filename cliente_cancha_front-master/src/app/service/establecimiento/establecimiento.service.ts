import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Establecimiento } from 'src/app/model/establecimiento/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  private apiEstablecimiento = environment.apiCliente + "/establecimiento";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    })
  };


  constructor(private http: HttpClient,
    private alertaService: AlertaService) {
      
  };

  consultaEstablecimiento(lat:number,lng:number):Observable<Establecimiento[]>{
    return this.http.get<Establecimiento[]>(this.apiEstablecimiento+"/"+lng+"/"+lat,this.httpOptions);
  }
}
