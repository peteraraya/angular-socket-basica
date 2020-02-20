import { NgModule } from '@angular/core';
// Importaciones necesarias
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuard } from './guards/usuario-guard.service';


const appRoutes:Routes = [
  { path:'', component: LoginComponent},
  // Ruta Protegida
  { 
    path: 'mensajes', 
    canActivate:[UsuarioGuard],
    component: MensajesComponent 
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot( appRoutes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
