import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dataSource: any = [];

  entregas = [];

  obtenerVentas() {
    const url = 'http://localhost:5000/ventas';

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.dataSource = data;
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerVentas();
  }

}
