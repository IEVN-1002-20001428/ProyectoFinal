import { Component, OnInit } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {

  constructor(private http: HttpClient) { }

  nombre = '';
  descripcion = '';
  autor = '';
  editorial = '';
  categoria = '';
  precio = 0;
  existencias = 0;
  imagenBase64?: string;

  dataSource: any = [];

  categorias: Categoria[] = [
    {
      "id": 1,
      "nombre": "Novelas"
    },
    {
      "id": 2,
      "nombre": "Terror"
    },
    {
      "id": 3,
      "nombre": "Ciencia Ficción"
    },
  ]

  ngOnInit(): void {
    this.dataSource = this.categorias
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


  registrarProducto() {

    if (this.validateForm()) {

      const url = 'http://localhost:5000/libros';
      let parametros = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        autor: this.autor,
        editorial: this.editorial,
        existencias: this.existencias,
        categoria: this.categoria,
        imagen: this.imagenBase64
      }

      this.http.post<any>(url, parametros)
        .subscribe(
          (data) => {
            if (data.exito) {
              Swal.fire('', 'El libro se registró correctamente', 'success').then(function () {
                location.reload();
              });
            } else {
              Swal.fire('Error', 'El libro no pudo ser registrado, puede que ya exista o los datos sean incorrectos', 'error');
            }
          },
          (error) => {
            console.error('Error al obtener libros:', error);
          }
        );
    }

  }

}
