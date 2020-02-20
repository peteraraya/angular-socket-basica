import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketsService } from '../services/websockets.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    public wsService:WebsocketsService,
    private router: Router
  ) { }


  canActivate(){

    // console.log(this.wsService.getUsuario());
    //Evaluar si existe un usuario
    if (this.wsService.getUsuario()) {
      return true; // si existe
    }else{
      // que lo saque 
      this.router.navigateByUrl('/');
      return false; // si no existe
    }
  }
}
