import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dataSource: any = [];
  productos: Producto[] = [];

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

  ngOnInit(): void {
    this.obtenerLibros();
  }

}
