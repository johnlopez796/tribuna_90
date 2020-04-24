import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { Observable } from 'rxjs/internal/Observable';
import { Reserva } from 'src/app/model/reserva/reserva';
import { formatDate } from '@angular/common';
import { ReservaRq } from 'src/app/model/reserva/reservaRq';
import { ReservaId } from 'src/app/model/reserva/reservaId';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiReserva = environment.apiCliente + "/reserva";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token"),
      'token': sessionStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient,
    private alertaService: AlertaService) { }

  public consultaHorario(fechaIni:Date,fechaFin:Date,idEstablecimient:String):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.apiReserva
      +"?fechaIni="+formatDate(fechaIni,"yyyy-MM-dd-HH",'en-US')+
      "&fechaFin="+formatDate(fechaFin,"yyyy-MM-dd-HH",'en-US')
      +"&idEstablecimiento="+idEstablecimient,this.httpOptions);
  } 

  public reservar(reservaRq:ReservaRq):Observable<ReservaId>{
    //this.httpOptions.headers.append("responseType","text");
    return this.http.post<ReservaId>(this.apiReserva,reservaRq,this.httpOptions);
  } 
}
