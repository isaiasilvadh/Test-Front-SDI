import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


 
  private router = inject( Router );
  private fb = inject( FormBuilder );
  private usuarioService = inject( UsuarioService );


  public formSubmitted = false;

  handleSuccess(data:any){
    console.log(data);
    
  }



  public loginForm: FormGroup = this.fb.group({
    recaptcha: ['', Validators.required ],
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [ false ],
  });




  login(){

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value );
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' );
      });

  }

}
