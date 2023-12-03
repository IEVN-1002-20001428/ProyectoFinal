import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { GetAdmin } from '../interfaces/usuario';

@Component({
  selector: 'app-nuevoadmin',
  templateUrl: './nuevoadmin.component.html',
  styleUrls: ['./nuevoadmin.component.css']
})
export class NuevoadminComponent {

  constructor(private http: HttpClient) { }

  usuario = '';
  correo = '';
  password = '';

  validateForm(): boolean {
    var regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (this.usuario.length < 1) {
      Swal.fire('Error', 'Favor de ingresar un nombre de usuario valido', 'error');
      return false;
    }

    if (this.correo.length < 1 || !regexCorreo.test(this.correo)) {
      Swal.fire('Error', 'Favor de completar el campo de correo correctamente', 'error');
      return false;
    }

    if (this.password.length < 4) {
      Swal.fire('Error', 'Favor de completar el campo de contraseña correctamente', 'error');
      return false;
    }

    return true;
  }

  registrarAdmin() {

    if (this.validateForm()) {

      const url = 'http://localhost:5000/usuarios';
      let parametros = {
        nombre: this.usuario,
        correo: this.correo,
        contrasenia: this.password
      }

      this.http.post<GetAdmin>(url, parametros)
        .subscribe(
          (data) => {
            if (data.exito) {
              Swal.fire('', 'El usuario se registró correctamente', 'success').then(function () {
                location.reload();
              });
            } else {
              Swal.fire('Error', 'El usuario no pudo ser registrado, puede que ya exista o los datos sean incorrectos', 'error');
            }
          },
          (error) => {
            console.error('Error al obtener libros:', error);
          }
        );
    }

  }

}
