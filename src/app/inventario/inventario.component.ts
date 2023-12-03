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
          this.dataSource.push(data);
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerLibros();
  }

}
