import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/model/usuario/ingreso';
import { UserService } from 'src/app/service/user/user.service';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ingreso:Ingreso;
  formLogin: FormGroup;
  constructor(private usuarioService:UserService,
  private alertaService:AlertaService,
  private router:Router) {
    
   }

  ngOnInit() {
    this.alertaService.clear();    
    this.formLogin = new FormGroup({
      'nickName':new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password':new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ])
    });    
  }


  registrar(frmLogin){
    this.ingreso = new Ingreso();
    this.ingreso.nickName = frmLogin.nickName;
    this.ingreso.password = frmLogin.password;

     this.usuarioService.login(this.ingreso).subscribe(
       user => {
        sessionStorage.setItem("userObject", JSON.stringify(user));
        
        sessionStorage.setItem("token",user.token);
        sessionStorage.setItem("user",user.id);
        sessionStorage.setItem("nickname",user.nickname);
        sessionStorage.setItem("nombre",user.nombres);
        sessionStorage.setItem("apellido",user.apellidos);
        sessionStorage.setItem("documento",user.documento);
        sessionStorage.setItem("fecha",user.fechaNacimiento);
        this.router.navigateByUrl("/home");

      },
       err => {
        this.alertaService.agregarMensaje("Usuario o contraseña incorrecto","err");
       }       
     );
  }

  get nickName() { return this.formLogin.get('nickName'); }
  
  get password() { return this.formLogin.get('password'); }
}
