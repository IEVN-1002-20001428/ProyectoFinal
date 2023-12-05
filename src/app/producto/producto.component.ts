import { Component, OnInit } from '@angular/core';
import { CarritoItem, Producto } from '../interfaces/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private spinner: NgxSpinnerService) { }

  id_producto: number = 0;
  cantidad = 1;
  productos: CarritoItem[] = [];

  titulo = '';
  autor = '';
  editorial = '';
  categoria = '';
  descripcion = '';
  precio = 0;
  imagen = '';
  imagenSrc = '';
  existencias = 0;
  dataSource: any = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idString = params['id'];
      if (idString) {
        this.id_producto = parseInt(idString, 10);
        this.getProducto();
        this.obtenerLibros();
        this.dataSource = this.productos;
      }
    });
  }

  getProducto() {

    const url = `http://localhost:5000/libros/${this.id_producto}`;

    this.http.get<any>(url)
      .subscribe(
        (data) => {
          this.titulo = data.libro.nombre;
          this.descripcion = data.libro.descripcion;
          this.precio = data.libro.precio;
          this.autor = data.libro.autor;
          this.editorial = data.libro.editorial;
          this.existencias = data.libro.existencias;
          this.categoria = data.libro.id_categoria;
          this.imagen = data.libro.imagen;
          this.obtenerImagen(this.imagen);
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
  }

  obtenerImagen(imagen: string) {
    const url = `http://localhost:5000/covers/${imagen}`;

    this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(
      response => {
        if (response.status === 200) {
          this.imagenSrc = url;
        } else {
          console.error('Error al obtener la imagen. Status:', response.status);
        }
      },
      error => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }

  //OBTENER LIBROS RELACIONADOS
  //#region
  obtenerLibros() {
    const url = 'http://localhost:5000/libros';

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.productos = data;
          this.dataSource = data;
          this.productos.forEach(producto => this.obtenerImagenes(producto));
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );
  }

  obtenerImagenes(producto: { imagen: string }) {
    const url = `http://localhost:5000/covers/${producto.imagen}`;

    this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(
      response => {
        if (response.status === 200) {
          producto.imagen = url;
        } else {
          console.error('Error al obtener la imagen. Status:', response.status);
        }
      },
      error => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }
  //#endregion

  validateUser(): boolean {
    let userType = this.authService.getUserType();
    if (userType === 'cliente') {
      return true;
    } else {
      Swal.fire('Error', 'Favor de inciar sesión para proceder con la compra', 'error');
      return false;
    }
  }

  validateForm(): boolean {
    if (this.cantidad == 0 || !this.cantidad || this.cantidad > this.existencias || this.cantidad % 1 != 0) {
      Swal.fire('Error', 'Ingrese una cantidad correcta', 'error');
      return false;
    }
    return true;
  }

  agregarCarrito(event: Event) {
    event.preventDefault();

    try {
      if (!this.validateUser() || !this.validateForm()) {
        return;
      }

      this.obtener();

      if (!this.existe(this.id_producto)) {

        let producto = {
          "id": this.id_producto,
          "nombre": this.titulo,
          "imagen": this.imagenSrc,
          "autor": this.autor,
          "cantidad": this.cantidad,
          "precio": this.precio,
          "total": (this.precio * this.cantidad)
        }

        this.productos.push(producto);
        this.guardar();

      } else {

        let productoExistente = this.productos.find(producto => producto.id === this.id_producto);

        if (productoExistente) {
          if (productoExistente.cantidad + 1 <= this.existencias) {
            productoExistente.cantidad = (productoExistente.cantidad || 1) + this.cantidad;
            productoExistente.total += this.precio * this.cantidad;
            this.guardar();
          } else {
            Swal.fire('Error', 'La cantidad agregada sobrepasa el stock actual', 'error');
          }
        }
      }

    } catch (error) {
      console.error('Error en agregarCarrito:', error);
    }
  }

  guardar() {
    localStorage.setItem('Productos', JSON.stringify(this.productos));
    Swal.fire('', 'Agregado a la cesta', 'success');
  }

  existe(id: number) {
    return this.productos.find(producto => producto.id === id);
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

}
