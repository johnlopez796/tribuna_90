import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  mensajes: Alerta[] = [];

  constructor() { }

  agregarMensaje(mensaje:string, severidad:string){
    this.add({descripcion:mensaje,tipo:severidad});
  }

  add(mensaje: Alerta) {
    this.mensajes.push(mensaje);
  }

  close(alert: Alerta) {
    this.mensajes.splice(this.mensajes.indexOf(alert), 1);
  }

  clear() {
    this.mensajes = [];
  }
}
