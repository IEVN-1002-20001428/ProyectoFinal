import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id_cliente = 0;
  usuario = '';
  nombre = '';
  contrasenia = '';
  correo = '';
  direccion = '';
  compras: any = [];

  constructor(private router: Router, private http: HttpClient) { }

  dataSource: any = [];
  obtenerCliente() {

    this.usuario = localStorage.getItem('user') || '';

    const url = `http://localhost:5000/clientes/${this.usuario}`;

    this.http.get<any>(url)
      .subscribe(
        (data) => {
          this.id_cliente = data.cliente.id_cliente;
          this.nombre = data.cliente.nombre;
          this.usuario = data.cliente.usuario;
          this.contrasenia = data.cliente.contrasenia;
          this.correo = data.cliente.correo;
          this.direccion = data.cliente.direccion;
          this.obtenerCompras(this.id_cliente);
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  actualizarCliente() {
    const url = `http://localhost:5000/clientes/${this.usuario}`;
    let parametros = {
      usuario: this.usuario,
      nombre: this.nombre,
      correo: this.correo,
      direccion: this.direccion,
      contrasenia: this.contrasenia
    }

    this.http.put<any>(url, parametros)
      .subscribe(
        (data) => {
          if (data.exito) {
            Swal.fire('', 'Los datos se actualizaron correctamente', 'success').then(function () {
              location.reload();
            });
          } else {
            Swal.fire('Error', 'Hubo un problema al actualizar los datos', 'error');
          }
        },
        (error) => {
          console.error('Error de petición:', error);
        }
      );
  }

  eliminarCliente() {
    Swal.fire({
      title: "¿Segur@ que quieres eliminar tu cuenta?",
      showCancelButton: true,
      confirmButtonText: "Si, continuar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        const url = `http://localhost:5000/clientes/${this.usuario}`;

        this.http.delete<any>(url)
          .subscribe(
            (data) => {
              if (data.exito) {
                Swal.fire('', 'Cuenta eliminada exitosamente', 'success').then(function () {
                });
                this.router.navigate(['/login']);
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

  obtenerCompras(id_cliente: number) {
    const url = `http://localhost:5000/compras/${id_cliente}`;

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.compras = data;
        },
        (error) => {
          console.error('Error al obtener las compras:', error);
        }
      );
  }

}
