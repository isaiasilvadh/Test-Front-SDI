import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { ComponentsModule } from '../components/components.module';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ]
})
export class PagesModule { }
