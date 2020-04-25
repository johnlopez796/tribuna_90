import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/user/auth.service';
import { LoginComponent } from 'src/app/component/login/login.component';
import { HomeComponent } from 'src/app/component/home/home.component';
import { RegistroComponent } from 'src/app/component/registro/registro.component';
import { ReservaComponent } from 'src/app/component/reserva/reserva.component';
import { FormComponent } from 'src/app/component/reserva/form/form/form.component';
import { FilterComponent } from 'src/app/component/reserva/filter/filter/filter.component';
import { PerfilComponent } from './component/perfil/perfil.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthService] ,
    children: [
        { path: 'reserva', component: ReservaComponent, outlet: 'main', children: [
            { path: 'filtro', component: FilterComponent, outlet: 'formSection' }
          ] },
        { path: 'detail',component: FormComponent }, 
        { path: 'perfil', component: PerfilComponent, outlet: 'main', children: [
          { path: 'filtro', component: FilterComponent, outlet: 'formSection' }
        ] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
