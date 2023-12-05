import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.component.html',
  styleUrls: ['./editarproducto.component.css']
})
export class EditarproductoComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  id_producto?: number;
  nombre = '';
  descripcion = '';
  autor = '';
  editorial = '';
  categoria = '';
  precio = 0;
  existencias = 0;
  imagenBase64?: string;
  imagen?: string;
  imagenSrc = '';

  obtenerProducto() {

    const url = `http://localhost:5000/libros/${this.id_producto}`;

    this.http.get<any>(url)
      .subscribe(
        (data) => {
          this.nombre = data.libro.nombre;
          this.descripcion = data.libro.descripcion;
          this.autor = data.libro.autor;
          this.editorial = data.libro.editorial;
          this.categoria = data.libro.id_categoria;
          this.precio = data.libro.precio;
          this.existencias = data.libro.existencias;
          this.imagen = data.libro.imagen;

          this.obtenerImagen();
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
  }

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.id_producto = parseInt(idString, 10);
    }
    this.obtenerProducto();
  }

  validateForm(): boolean {

    if (this.nombre.length < 1) {
      Swal.fire('Error', 'Favor de ingresar un título valido', 'error');
      return false;
    }

    if (this.descripcion.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de descripción correctamente', 'error');
      return false;
    }

    if (this.autor.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de autor correctamente', 'error');
      return false;
    }

    if (this.categoria.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de categoria correctamente', 'error');
      return false;
    }

    if (this.editorial.length < 1) {
      Swal.fire('Error', 'Favor de completar el campo de editorial correctamente', 'error');
      return false;
    }

    if (!this.precio || this.precio <= 0) {
      Swal.fire('Error', 'Favor de completar el campo de precio correctamente', 'error');
      return false;
    }

    if (!this.existencias || this.existencias < 0) {
      Swal.fire('Error', 'Favor de completar el campo de existencias correctamente', 'error');
      return false;
    }

    return true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagenBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  actualizarProducto() {

    if (this.validateForm()) {

      const url = `http://localhost:5000/libros/${this.id_producto}`;
      let parametros = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        autor: this.autor,
        editorial: this.editorial,
        existencias: this.existencias,
        categoria: this.categoria,
        imagen: this.imagenBase64 ? this.imagenBase64 : ''
      }

      this.http.put<any>(url, parametros)
        .subscribe(
          (data) => {
            if (data.exito) {
              Swal.fire('', 'Los cambios se guardaron correctamente', 'success').then(function () {
                location.reload();
              });
            } else {
              Swal.fire('Error', 'El libro no pudo ser modificado, puede que ya exista o los datos sean incorrectos', 'error');
            }
          },
          (error) => {
            console.error('Error al obtener libros:', error);
          }
        );
    }

  }

  eliminarProducto() {

  }

  obtenerImagen() {
    const url = `http://localhost:5000/covers/${this.imagen}`;

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

}
