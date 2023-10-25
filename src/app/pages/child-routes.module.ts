import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PerfilComponent } from './perfil/perfil.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



const childRoutes: Routes = [
  // Practica
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },


  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario'} },
  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'} },

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ],component: UsuariosComponent, data: { title: 'Usuario de aplicación'} },
]


@NgModule({
  imports: [ RouterModule.forChild( childRoutes )],
  exports: [ RouterModule ],
})
export class ChildRoutesModule { }
