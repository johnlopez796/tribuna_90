import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario/Usuario';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta/alerta.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  usuario:Usuario;

  constructor( private alertaService:AlertaService,
    private router:Router
  ) { }

  ngOnInit() {
    
    console.log("Ingreso A Contacto");
    this.usuario = JSON.parse(sessionStorage.getItem("userObject"));
    console.log(this.usuario);

    
  }

}
