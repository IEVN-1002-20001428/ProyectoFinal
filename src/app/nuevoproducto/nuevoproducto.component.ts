import { Component, OnInit } from '@angular/core';
import { Categoria } from '../interfaces/categoria';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {

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

}
