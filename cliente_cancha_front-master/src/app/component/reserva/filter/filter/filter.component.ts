import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ReservaCompService } from 'src/app/component/reserva/service/reserva-comp.service';
import { Horario } from 'src/app/model/reserva/horario';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  formFilter:FormGroup;
  maxFechaReserva:Date;
  minFechaReserva:Date;
  maxSelectFecha:Date;
  minSelectFecha:Date;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    public reservaCompService: ReservaCompService
  ) { }

  ngOnInit() {
    this.minFechaReserva = new Date();
    this.maxFechaReserva = new Date();
    console.log( this.minFechaReserva.getDate());
    this.maxFechaReserva.setDate( this.minFechaReserva.getDate() +8 );
    this.minSelectFecha = new Date();
    this.minSelectFecha.setDate( this.minFechaReserva.getDate());
    this.maxSelectFecha = new Date();
    this.maxSelectFecha.setDate( this.minFechaReserva.getDate() +8 );

    this.formFilter = new FormGroup({
      'fechaConsultaIni':new FormControl('', [
        Validators.required
      ]),
      'fechaConsultaFin':new FormControl('', [
        Validators.required
      ])
    });
  }

  get fechaConsultaIni() { return this.formFilter.get('fechaConsultaIni'); }

  get fechaConsultaFin() { return this.formFilter.get('fechaConsultaFin'); }

  buscar(formData){
    let fechaIni:Date = formData.fechaConsultaIni;
    let fechFin:Date = formData.fechaConsultaFin;
    this.reservaCompService.horarioList = [];
    this.reservaService.consultaHorario(fechaIni,fechFin,this.reservaCompService.idEstablecimiento).subscribe(
      list => {
        list.forEach(reservaHorario => {
          let horario:Horario = new Horario();
          horario.capacidad = reservaHorario.canchaDto.capacidad;
          horario.idCancha = reservaHorario.canchaDto.id;
          horario.horaFin = reservaHorario.horaFin;
          horario.horaIni = reservaHorario.horaIni;
          horario.tarifa = reservaHorario.tarifa.tarifa;
          this.reservaCompService.horarioList.push(horario);
        });
        this.reservaCompService.mostrarTabla = true;  
      }
    );
  }

  

}
