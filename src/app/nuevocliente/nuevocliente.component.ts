import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.css']
})
export class NuevoclienteComponent {

  usuario = '';
  nombre = '';
  apaterno = '';
  amaterno = '';
  correo = '';
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

    if (this.apaterno.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de apellido paterno', 'error');
      return false;
    }

    if (this.amaterno.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de apellido materno', 'error');
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
      Swal.fire('', 'El usuario se registró correctamente', 'success');
    }

  }

}
