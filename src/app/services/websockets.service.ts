import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Usuario } from "../classes/usuario";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class WebsocketsService {
  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    // este se ejecuta una vez
    this.checkStatus();
  }

  // Metodo para revisar esto del servidor
  // Estos son observables : van a estar pendientes de lo que suceda
  checkStatus() {
    this.socket.on("connect", () => {
      console.log("Conectado al sevidor");
      this.socketStatus = true;
      this.cargarStorage();
    });
    this.socket.on("disconnect", () => {
      console.log("Desconectado del sevidor");
      this.socketStatus = false;
    });
  }

  // Metodo para decirle a mi servidor que tipo de eventos estoy disparando
  // Mensajes : emite cualquier información hacia el servidor
  emit(evento: string, payload?: any, callback?: Function) {
    // emit(eventos que quiero emitir, payload?, callback?)
    console.log("Emitiendo ", evento);
    this.socket.emit(evento, payload, callback);
  }

  // Metodo que escuche cualquier evento que emita el servidor
  // necesitamos que este metodo regrese un observable , donde pueda subscribirme en cualquier
  // parte de la aplicación que yo necesite estar escuchando ese evento en particular
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  // Metodo Login: necesito que mi socket-server sepa que cliente está conectado
  loginWS(nombre: string) {
    // console.log('Configurando', nombre);

    // Optimización
    return new Promise((resolve, reject) => {
      this.emit("configurar-usuario", { nombre }, resp => {
        // console.log(resp);

        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });
    });

    // this.socket.emit('configurar-usuario',{nombre},(resp) =>{
    //   // callback que se ejecuta despues
    //   console.log(resp);
    // });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem("usuario");

    const payload = { nombre: "sin-nombre" };

    this.emit("configurar-usuario", payload,()=>{});

    this.router.navigateByUrl('/');
  }

  getUsuario() {
    return this.usuario;
  }

  // Metodo para almacenar información en LocalStorage
  guardarStorage() {
    localStorage.setItem("usuario", JSON.stringify(this.usuario));
  }

  // Metodo para leer información del Localstorage
  cargarStorage() {
    // si existe algo en localstorage
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.loginWS(this.usuario.nombre);
    }
  }
}
