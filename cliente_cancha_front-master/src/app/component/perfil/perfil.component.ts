import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario;

  constructor() { }

  ngOnInit() {

    this.usuario = JSON.parse(sessionStorage.getItem("userObject"));
  }

}
