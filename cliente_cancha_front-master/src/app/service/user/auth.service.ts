import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { HttpClient, HttpRequest, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.validarSesion()) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
