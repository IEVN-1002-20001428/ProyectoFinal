import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
  usuario = '';
  password = '';
  correo = '';

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  obtenerUsuario() {

    const url = `http://localhost:5000/usuarios/${this.usuario}`;

    this.http.get<any>(url)
      .subscribe(
        (data) => {
          this.usuario = data.usuario.nombre;
          this.password = data.usuario.contrasenia;
          this.correo = data.usuario.correo;
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
  }

  ngOnInit(): void {
    this.usuario = this.route.snapshot.paramMap.get('id') || '';
    this.obtenerUsuario();
  }

  actualizarUsuario() {
    const url = `http://localhost:5000/usuarios/${this.usuario}`;
    let parametros = {
      usuario: this.usuario,
      correo: this.correo,
      contrasenia: this.password
    }

    this.http.put<any>(url, parametros)
      .subscribe(
        (data) => {
          if (data.exito) {
            Swal.fire('', 'Los datos se actualizaron correctamente', 'success').then(function () {
            });
            this.router.navigate(['/usuarios']);
          } else {
            Swal.fire('Error', 'Hubo un problema al actualizar los datos', 'error');
          }
        },
        (error) => {
          console.error('Error de petición:', error);
        }
      );
  }

  eliminarUsuario() {
    Swal.fire({
      title: "¿Segur@ que quieres eliminar esta cuenta?",
      showCancelButton: true,
      confirmButtonText: "Si, continuar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        const url = `http://localhost:5000/usuarios/${this.usuario}`;

        this.http.delete<any>(url)
          .subscribe(
            (data) => {
              if (data.exito) {
                Swal.fire('', 'Cuenta eliminada exitosamente', 'success').then(function () {
                });
                this.router.navigate(['/admin']);
              } else {
                Swal.fire('Error', 'Hubo un problema al eliminar la cuenta', 'error');
              }
            },
            (error) => {
              console.error('Error de petición:', error);
            }
          );

      }
    });
  }
}
