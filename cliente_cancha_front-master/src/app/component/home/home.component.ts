import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario/Usuario';
import { Time } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre:string;
  edad:string;
  nickname:string;

  constructor() { }

  ngOnInit() {
    this.nombre = sessionStorage.getItem("nombre");
    this.edad ="00"
    this.nickname = sessionStorage.getItem("nickname");
  }

}
