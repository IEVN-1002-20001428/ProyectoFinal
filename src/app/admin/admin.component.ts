import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { GetAdmin } from '../interfaces/usuario';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  usuario = '';
  password = '';

  validateForm(): boolean {
    var regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (this.usuario.length < 1) {
      Swal.fire('Error', 'Favor de ingresar el nombre de usuario', 'error');
      return false;
    }

    if (this.password.length < 4) {
      Swal.fire('Error', 'Favor de completar el campo de contraseña correctamente', 'error');
      return false;
    }

    return true;
  }

  loginAsAdmin() {
    if (this.validateForm()) {

      const url = `http://localhost:5000/usuarios/${this.usuario}/${this.password}`;

      this.http.get<GetAdmin>(url)
        .subscribe(
          (data) => {
            if (data.exito) {
              this.authService.login('admin');
              this.router.navigate(['/inventario']);
            } else {
              Swal.fire('Error', 'El usuario no pudo ser encontrado, verifique sus datos', 'error');
            }
          },
          (error) => {
            console.error('Error al obtener el servicio:', error);
          }
        );
    }
  }

}
