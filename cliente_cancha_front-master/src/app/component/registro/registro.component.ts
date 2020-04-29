import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { UserService } from 'src/app/service/user/user.service';
import { Usuario } from 'src/app/model/usuario/Usuario';
import { AlertaService } from 'src/app/service/alerta/alerta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuarioObj: Usuario;
  maxNacimiento;
  formUsr: FormGroup;

  constructor(private usuarioService: UserService
    , private alertaService: AlertaService
    , private router: Router) { }

  ngOnInit() {
    this.maxNacimiento = new Date();
    this.maxNacimiento.setFullYear(this.maxNacimiento.getFullYear() - 14);
    this.formUsr = new FormGroup({
      'apellidos': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      'documento': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.email,
      ]),
      'fechaNacimiento': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      'usuario': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      'nombres': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      'tipoDocumento': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      'password2': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ])

    });
  }

  registrar(formData) {
    this.usuarioObj = new Usuario();
    this.usuarioObj.apellidos = formData.apellidos;
    this.usuarioObj.clave = formData.password;
    this.usuarioObj.documento = formData.documento;
    this.usuarioObj.email = formData.email;
    this.usuarioObj.fechaNacimiento = formData.fechaNacimiento;
    this.usuarioObj.nickname = formData.usuario;
    this.usuarioObj.nombres = formData.nombres;
    this.usuarioObj.tipoDocumento = formData.tipoDocumento;


    this.usuarioService.registroUsuario(this.usuarioObj).subscribe(
      user => {
        this.alertaService.agregarMensaje("Se registro correctamente el usuario", "info");
        this.formUsr.reset({});
        setTimeout(() => {
          this.router.navigateByUrl("/login?returnUrl=%2Fhome");
          this.alertaService.agregarMensaje("Se registro correctamente el usuario", "info");
        }, 3000
        );

      },
      error => {
        this.alertaService.agregarMensaje("El usuario ya se encuentra registrado, porfavor integre ingresar a la plataforma", "info");
        setTimeout(() => {
          this.router.navigateByUrl("/login?returnUrl=%2Fhome");          
        }, 3000
        );
      }
    );
  }

  get apellidos() { return this.formUsr.get('apellidos'); }

  get clave() { return this.formUsr.get('clave'); }

  get documento() { return this.formUsr.get('documento'); }

  get email() { return this.formUsr.get('email'); }

  get fechaNacimiento() { return this.formUsr.get('fechaNacimiento'); }

  get usuario() { return this.formUsr.get('usuario'); }

  get tipoDocumento() { return this.formUsr.get('tipoDocumento'); }

  get password() { return this.formUsr.get('password'); }

  get nombres() { return this.formUsr.get('nombres'); }

  get password2() { return this.formUsr.get('password2'); }

}
