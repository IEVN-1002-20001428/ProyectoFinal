import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { GetClient } from '../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.css']
})
export class NuevoclienteComponent {

  constructor(private router: Router, private http: HttpClient) { }

  usuario = '';
  nombre = '';
  correo = '';
  direccion = '';
  password = '';

  validateForm(): boolean {
    var regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (this.usuario.length < 1) {
      Swal.fire('Error', 'Favor de ingresar un nombre de usuario valido', 'error');
      return false;
    }

    if (this.nombre.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de nombre', 'error');
      return false;
    }

    if (this.direccion.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de direccion', 'error');
      return false;
    }

    if (this.correo.length < 1 || !regexCorreo.test(this.correo)) {
      Swal.fire('Error', 'Favor de completar el campo de correo correctamente', 'error');
      return false;
    }

    if (this.password.length != 8) {
      Swal.fire('Error', 'Favor de completar el campo de contraseña correctamente', 'error');
      return false;
    }

    return true;
  }

  registrarCliente() {

    if (this.validateForm()) {
      const url = 'http://localhost:5000/clientes';
      let parametros = {
        usuario: this.usuario,
        nombre: this.nombre,
        contrasenia: this.password,
        correo: this.correo,
        direccion: this.direccion
      }

      this.http.post<GetClient>(url, parametros)
        .subscribe(
          (data) => {
            if (data.exito) {
              Swal.fire('', 'El usuario se registró correctamente', 'success').then(function () {
              });
              this.router.navigate(['/login']);
            } else {
              Swal.fire('Error', 'El usuario no pudo ser registrado, puede que ya exista o los datos sean incorrectos', 'error');
            }
          },
          (error) => {
            console.error('Error de petición:', error);
          }
        );
    }

  }

}
