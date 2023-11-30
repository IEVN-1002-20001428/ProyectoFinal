import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  dataSource: any = [];

  entregas = [
    {
      "id": 1,
      "fecha": "23-11-2023",
      "cliente": "Dwayne Roca",
      "producto": "100 años de soledad",
      "cantidad": 1,
      "total": 1200
    },
    {
      "id": 2,
      "fecha": "24-11-2023",
      "cliente": "María Sánchez",
      "producto": "El principito",
      "cantidad": 3,
      "total": 600
    },
  ]

  ngOnInit(): void {
    this.dataSource = this.entregas
  }

}
