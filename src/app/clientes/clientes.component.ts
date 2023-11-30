import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  dataSource: any = [];

  clientes: Cliente[] = [
    {
      "id": 1,
      "nombre": "Alonso",
      "apaterno": "Pérez",
      "amaterno": "Oliva",
      "correo": "alonso@gmail.com"
    },
    {
      "id": 2,
      "nombre": "María",
      "apaterno": "Sánchez",
      "amaterno": "Méndez",
      "correo": "maria@gmail.com"
    },
    {
      "id": 3,
      "nombre": "Dwayne",
      "apaterno": "Jhonson",
      "amaterno": "Roca",
      "correo": "laroca@gmail.com"
    },
  ]

  ngOnInit(): void {
    this.dataSource = this.clientes
  }
}
