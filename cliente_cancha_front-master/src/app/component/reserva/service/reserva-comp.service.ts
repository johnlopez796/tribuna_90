import { Injectable } from '@angular/core';
import { Horario } from 'src/app/model/reserva/horario';

@Injectable({
  providedIn: 'root'
})
export class ReservaCompService {
  public mostrarFiltro:boolean=false;
  public mostrarTabla:boolean=false;
  public idEstablecimiento:string;
  public horarioList:Horario[] ;
  public idReserva:string;
  public horarioReserva:Horario;
  constructor() { }
  

}
