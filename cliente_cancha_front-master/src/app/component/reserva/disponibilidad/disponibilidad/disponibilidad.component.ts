import { Component, OnInit } from '@angular/core';
import { ReservaCompService } from 'src/app/component/reserva/service/reserva-comp.service';
import { Horario } from 'src/app/model/reserva/horario';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { ReservaRq } from 'src/app/model/reserva/reservaRq';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta/alerta.service';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css']
})
export class DisponibilidadComponent implements OnInit {

  horarioSeleccionado:Horario;
  displayedColumns: string[] = ['tarifa', 'horaIni', 'horaFin', 'tipoGrama', 'capacidad','actions'];
  constructor(public reservaCompServ:ReservaCompService,
    private reservaServiceHttp:ReservaService,
    private router: Router,
    private alertaService: AlertaService) { }

  ngOnInit() {
  }

  reservar(horario){
    console.log(horario.idCancha)
    let reservaRq:ReservaRq = new ReservaRq();
    reservaRq.idCancha = horario.idCancha;
    reservaRq.fechaReserva = formatDate(horario.horaIni,"yyyy-MM-dd-HH",'en-US');
    this.reservaServiceHttp.reservar(reservaRq).subscribe(
      idReserva =>{
        this.reservaCompServ.idReserva = idReserva.idReserva;
        this.reservaCompServ.horarioReserva = horario;
        this.alertaService.agregarMensaje("Reserva realizada", "info")
        this.router.navigate([{ outlets: { primary: ['detail']}}]);
      }
    );
  }

}
