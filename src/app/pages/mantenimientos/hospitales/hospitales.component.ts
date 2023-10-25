import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';



@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  private hospitalService = inject( HospitalService );



  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription;


  ngOnInit(): void {
    this.cargarHospitales();

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }



  cargarHospitales(){
    this.cargando= true;

    this.hospitalService.getHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }



  guardarCambios( hospital: Hospital ){

    this.hospitalService.actualizarHospital( hospital._id! , hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', ` El Hospital ${ hospital.nombre } se ha actualizado`, 'success' );
      });
  }

  eliminarHospital( hospital: Hospital ){

    return Swal.fire({
      title: 'Borrar Hospital',
      text: `Esta a punto de borrar a ${ hospital.nombre}` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospitalById( hospital._id! )
          .subscribe( resp => {
            this.cargarHospitales();
            Swal.fire( 'Borrado', `El Usuario ${ hospital.nombre} se ha borrado exitosamente`, 'success')
        });
      }
    });
  }

  async abrirSweetAlert(){

    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese Nombre de Hospital',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Crear Hospital',
      cancelButtonColor: '#d33',
    });

    if( !value ) return;

    if( value.trim().length > 0  ){
      this.hospitalService.crearHospital( value!)
        .subscribe( (resp: any )=> {
          this.hospitales.push( resp.hospital )
        })
    }

  }



}
