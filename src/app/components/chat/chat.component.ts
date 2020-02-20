import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensajesSubscription: Subscription;
  // scroll para el viewport
  elemento: HTMLElement;

  // Renderizaremos
  mensajes: any[] = [];

  constructor(
    // Importamos el servicio del chat
    public chatService : ChatService
  ) { }

  ngOnInit() {
    // tomo referencia
    this.elemento = document.getElementById('chat-mensajes');

    // estoy escuchando cualquier emisión del servidor llamada mensaje-nuevo
     this.mensajesSubscription = this.chatService.getMessages().subscribe(msg =>{
        console.log( msg );

      // Cuando recibimos un nuevo mensaje, insertamos el mensaje de la caja
      this.mensajes.push( msg );

      // necesitamos esperar que aparesca el mensaje
       setTimeout(() => {
         this.elemento.scrollTop = this.elemento.scrollHeight;
       }, 50);

    });
  }

  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){
    // validación
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage( this.texto);
    this.texto = '';
  }



}
