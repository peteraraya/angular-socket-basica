import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root'
})
// Será el responsable de todo lo que tenga que ver con la comunicación entre usuarios o envio de mensajes entre sí
export class ChatService {

  constructor(
    public wsService: WebsocketsService
  ) { }
    // envió mensajes
  sendMessage( mensaje: string ){
      const payload = {
        de : this.wsService.getUsuario().nombre,
        cuerpo: mensaje
      };

      // LLamo al websocket desde la aplicación
      this.wsService.emit( 'mensaje' , payload);
  }

  // escuchando mensajes
  getMessages(){
    // no haremos el subscribe en esta parte
    return this.wsService.listen('mensaje-nuevo');
  }


  // Metodos de mensajes privados
  getMessagesPrivate() {
    // esto regresa un observable que escucha un mensaje privado
    return this.wsService.listen('mensaje-privado');
  }
}
