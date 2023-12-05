import { Component, OnInit } from '@angular/core';
import { CarritoItem } from '../interfaces/producto';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  productos: CarritoItem[] = [];
  total = 0;
  numero_tarjeta = '';
  fecha = '';
  cvv = '';
  id_cliente = 0;
  usuario = '';

  ngOnInit(): void {
    this.obtener();
    this.obtenerTotal();
    this.obtenerCliente();
  }

  obtenerCliente() {

    this.usuario = localStorage.getItem('user') || '';

    const url = `http://localhost:5000/clientes/${this.usuario}`;

    this.http.get<any>(url)
      .subscribe(
        (data) => {
          this.id_cliente = data.cliente.id_cliente;
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
  }

  obtener(): any[] {
    const productosGuardados = localStorage.getItem('Productos');

    if (productosGuardados) {
      try {
        this.productos = JSON.parse(productosGuardados);
        return JSON.parse(productosGuardados);
      } catch (error) {
        console.error('Error al analizar productos desde localStorage:', error);
      }
    }
    return [];
  }

  obtenerTotal() {
    for (let i = 0; i < this.productos.length; i++) {
      this.total += this.productos[i].total || 0;
    }
  }

  guardar() {
    localStorage.setItem('Productos', JSON.stringify(this.productos));
  }

  eliminarItem(id: number) {
    this.obtener();

    const indice = this.productos.findIndex(p => p.id === id);
    if (indice != -1) {
      this.productos.splice(indice, 1);
      this.guardar();
      this.obtenerTotal();
      Swal.fire('', 'Producto eliminado', 'success').then(function () {
        location.reload();
      });
    }
  }

  validateForm(): boolean {
    var regex = /^[0-9]+$/;
    var regexFecha = /^[0-9\/]+$/;


    if (this.total <= 0) {
      Swal.fire('Error', 'El carrito se encuentra vacío', 'error');
      return false;
    }

    if (this.numero_tarjeta.length != 12 || !regex.test(this.numero_tarjeta)) {
      Swal.fire('Error', 'Favor de ingresar el número de tarjeta correctamente (12 dígitos numéricos)', 'error');
      return false;
    }

    if (this.fecha.length != 5 || !regexFecha.test(this.fecha)) {
      Swal.fire('Error', 'Favor de ingresar la fecha correctamente: DD/MM (5 dígitos)', 'error');
      return false;
    }

    if (this.cvv.length != 3 || !regex.test(this.cvv)) {
      Swal.fire('Error', 'Favor de ingresar el CVV correctamente (3 dígitos numéricos)', 'error');
      return false;
    }

    return true;
  }

  finalizarCompra() {

    if (this.validateForm()) {

      const url = 'http://localhost:5000/ventas';
      let parametros = {
        id_cliente: this.id_cliente,
        total: this.total,
        estatus: 1
      }

      this.http.post<any>(url, parametros)
        .subscribe(
          (data) => {
            if (data.exito) {

              var id_venta = data.id_venta;
              this.guardarDetalle(id_venta);

            } else {
              Swal.fire('Error', 'Hubo un problema al finalizar la venta', 'error');
            }
          },
          (error) => {
            console.error('Error de petición:', error);
          }
        );
    }

  }

  guardarDetalle(id_venta: number) {

    const url = 'http://localhost:5000/venta_detalle';

    const productosEnLocalStorage = localStorage.getItem('Productos');
    const productos: any[] = productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];

    let parametros = {
      id_venta: id_venta,
      productos: productos
    }

    this.http.post<any>(url, parametros)
      .subscribe(
        (data) => {
          if (data.exito) {
            Swal.fire('', 'La compra se registró exitosamente', 'success').then(function () {
              localStorage.removeItem('Productos');
            });
            this.router.navigate(['/perfil']);
          } else {
            Swal.fire('Error', 'Hubo un problema al registrar los libros', 'error');
          }
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );

  }

}
