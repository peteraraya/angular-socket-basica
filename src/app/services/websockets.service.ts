import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;

  constructor(private socket: Socket) { 
      // este se ejecuta una vez
      this.checkStatus();
  }

  // Estos son observables : van a estar pendientes de lo que suceda
  checkStatus(){
    this.socket.on('connect',()=> {
        console.log('Conectado al sevidor');
        this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del sevidor');
      this.socketStatus = false;
    });
  }

  // Mensajes : emite cualquier información hacia el servidor
  emit(evento: string, payload?: any, callback?: Function ){
    // emit(eventos que quiero emitir, payload?, callback?)
    console.log('Emitiendo ', evento);
    this.socket.emit( evento, payload, callback);


  }
 
  // Metodo que escuche cualquier evento que emita el servidor
  // necesitamos que este metodo regrese un observable , donde pueda subscribirme en cualquier
  // parte de la aplicación que yo necesite estar escuchando ese evento en particular
  listen( evento: string ){
    return  this.socket.fromEvent(evento);
  }

}
