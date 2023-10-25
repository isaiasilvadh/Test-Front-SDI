import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {


  private usuarioService = inject( UsuarioService );



  public currentPage = signal<number>(0);
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number = 0;
  public totalBusquedaUsuarios: number = 0;
  public cargando: boolean = true;
  public rolUser: string = '';
  public uidUser: string = '';



  ngOnInit(): void {
    this.uidUser = this.usuarioService.uid;
    this.rolUser = this.usuarioService.rolCurrentUser;

    this.cambiarPagina( this.currentPage() );

  }


  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getUsuarios( this.currentPage() )
    .subscribe( ({total, usuarios}) => {
      this.cargando = false;
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
    });
  }


  cambiarPagina( value: number ){

    this.currentPage.set(value);

    if( this.currentPage() <= 0){
      this.currentPage.set(0);
    }else if( this.currentPage() >= this.totalUsuarios ){
      this.totalUsuarios -= 1;
      this.currentPage.set( this.totalUsuarios );
    }

    this.cargarUsuarios();

  }


  eliminarUsuario( usuario: Usuario ){

    if( this.rolUser === 'USER_ROLE' ){
      return Swal.fire('Error', 'No tiene los permisos necesarios para eliminar un usuario, debe ser administrador', 'error');
    }

    if( usuario.uid === this.usuarioService.uid ){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    return Swal.fire({
      title: 'Borrar Usuario',
      text: `Esta a punto de borrar a ${ usuario.nombre}` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUserById( usuario ).
          subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
            'Borrado',
            `El Usuario ${ usuario.nombre} se ha borrado exitosamente`,
            'success'
          )})
      }
    })
  }


  cambiarRol( usuario: Usuario ){

    this.usuarioService.guardarUsuario( usuario )
      .subscribe(resp => {
        console.log(resp);
      });

  }


}
