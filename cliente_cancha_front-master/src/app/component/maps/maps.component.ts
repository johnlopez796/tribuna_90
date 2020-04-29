import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from 'src/app/service/establecimiento/establecimiento.service';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { Router } from '@angular/router';
import { ReservaCompService } from 'src/app/component/reserva/service/reserva-comp.service';
import { Establecimiento } from 'src/app/model/establecimiento/establecimiento';
import { Cancha } from 'src/app/model/establecimiento/cancha';
import { Point } from 'src/app/model/establecimiento/point';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  public initPoint: any = { lat: 4.615607, lng: -74.082397 }
  public marcador: any = [{ lat: 4.615607, lng: -74.082397 }]
  establecimientos: Establecimiento[];

  constructor(private establecimientoService: EstablecimientoService,
    private alertaService: AlertaService,
    public reservaCompService: ReservaCompService,
    private router: Router) { }

  ngOnInit() {


    // 1. Consultar los establecimientos que tiene registrados en BD 
    this.establecimientos = this.getEstablecimientos();


    this.reservaCompService.mostrarTabla = false;
  }

  getEstablecimientos() {
    let x = new Establecimiento();
    x.numeroCanchas = 5;
    x.nombre = "Cancha 1"
    x.ubicacion = "Dircción 1";
    let punto = new Point();
    punto.x = 4.615607;
    punto.y = -74.082397;
    x.location = punto;
    
    let cancha1 = new Cancha();
    cancha1.capacidad = 5;
    cancha1.tipoGrama = "Sintetica";

    let cancha2 = new Cancha();
    cancha2.capacidad = 5;
    cancha2.tipoGrama = "Natural";

    let cancha: Cancha[] = [];
    cancha.push(cancha1);
    cancha.push(cancha2);
    x.cancha = cancha;

    let y = new Establecimiento();
    y.numeroCanchas = 10;
    y.nombre = "Cancha 2"
    y.ubicacion = "Dircción 2";

    let punto1 = new Point();
    punto1.x = 4.600536;
    punto1.y = -74.104541;
    y.location = punto1;
    
    let cancha3 = new Cancha();
    cancha1.capacidad = 5;
    cancha1.tipoGrama = "Sintetica";

    let cancha4 = new Cancha();
    cancha2.capacidad = 5;
    cancha2.tipoGrama = "Natural";

    let canchaobj: Cancha[] = [];
    canchaobj.push(cancha3);
    canchaobj.push(cancha4);
    y.cancha = canchaobj;
  
    let canchas: Establecimiento[] = [];
    canchas.push(x);
    canchas.push(y);

    console.log(canchas);
    return  canchas;

    /*
    id: string;
    numeroCanchas: number;
    nombre: string;
    ubicacion: string;
    horaCierre: string;
    horaApertura: string;
    cancha: Cancha[];
    location:Point;

    id: string;
    capacidad: number;
    tipoGrama: string;
    tipoTecho: string;
    tarifa:Tarifa;
    */
  }   

  buscarCancha(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;
    this.establecimientoService.consultaEstablecimiento(lat, lng).subscribe(
      list => {
        this.marcador = [];
        this.marcador.push({ lat: lat, lng: lng, user: "Inicio" });
        if (list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            this.marcador.push({
              lat: list[i].location.x, lng: list[i].location.y,
              name: list[i].nombre, id: list[i].id,
              ubicacion: list[i].ubicacion
            });
          }
        }else{
          this.alertaService.agregarMensaje("No hay establecimientos cerca", "info")
        }
      },
      err => {
        this.alertaService.agregarMensaje("Error consultando establecimientos " + err, "fatal")
      }
    );
  }

  mostrarFiltro(idEstablecimiento:string){
    this.reservaCompService.idEstablecimiento = idEstablecimiento;
    this.reservaCompService.mostrarFiltro = true;
  }

}
