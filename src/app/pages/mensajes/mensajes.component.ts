import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  nombreUsuario:string = '';

  constructor(public wsServices: WebsocketsService) {

    this.nombreUsuario = wsServices.usuario.nombre;
   }

  ngOnInit() {
  }

  salir(){
    this.wsServices.logoutWS();
  }
}
