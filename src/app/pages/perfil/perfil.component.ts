import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  private fb = inject( FormBuilder );
  private usuarioService = inject( UsuarioService );

  public perfilForm: FormGroup = new FormGroup({});
  public usuario: Usuario | undefined;


  ngOnInit(): void {

    this.usuario = this.usuarioService.usuario;

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario?.nombre, Validators.required ],
      email: [this.usuario?.email, [ Validators.required, Validators.email ] ],
    });


  }

  actualizarPerfil(){
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
      .subscribe( resp => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;

        Swal.fire('Usuario Actualizado', `Se ha actualizado el perfil de ${ this.usuario?.nombre }`, 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }




}
