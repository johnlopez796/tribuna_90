import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario/Usuario';
import { Time } from '@angular/common';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { Usuario } from 'src/app/model/usuario/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  nombre:string;
  edad:string;
  nickname:string;
  token:string;
  usuario:Usuario;

  constructor( private alertaService:AlertaService,
    private router:Router) { }

  ngOnInit() {

    this.usuario = JSON.parse(sessionStorage.getItem("userObject"));
    console.log(this.usuario);

    if (!this.usuario.token) {
      this.router.navigateByUrl("/");
    }else{
      this.alertaService.agregarMensaje("Ingreso correcto","info");
    }
  }

  logOut(){
     sessionStorage.clear; 
     console.log("Ingreso");
     this.router.navigateByUrl("/login?returnUrl=%2Fhome");


  }

}
