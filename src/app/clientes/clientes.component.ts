import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dataSource: any = [];
  clientes: Cliente[] = [];

  obtenerClientes() {
    const url = 'http://localhost:5000/clientes';

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.dataSource.push(data);
        },
        (error) => {
          console.error('Error al obtener libros:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }
}
