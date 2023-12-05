import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dataSource: any = [];
  productos: Producto[] = [];
  listFilter: string = '';

  obtenerImagen(producto: { imagen: string }) {
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

  obtenerLibros() {
    const url = 'http://localhost:5000/libros';

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.productos = data;
          this.dataSource = data;
          this.productos.forEach(producto => this.obtenerImagen(producto));
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerLibros();
    this.dataSource = this.productos
  }

}
