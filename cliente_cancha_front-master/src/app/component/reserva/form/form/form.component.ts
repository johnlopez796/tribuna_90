import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private reservaService:ReservaService) { }

  ngOnInit() { 
  }



}
