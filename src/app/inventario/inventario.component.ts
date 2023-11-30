import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  dataSource: any = [];

  productos: Producto[] = [
    {
      "id": 1,
      "nombre": "Un hombre iluminado",
      "descripcion": "Novela escrita por B.Sanderson",
      "autor": "Brandon Sanderson",
      "id_categoria": 1,
      "precio": 579,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 10
    },
    {
      "id": 2,
      "nombre": "Nuestras resistencias",
      "descripcion": "Obra compuesta. Novela de varios autores",
      "autor": "Varios autores",
      "id_categoria": 2,
      "precio": 225,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/t/m/tmp9786078941209_14d5.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 15
    },
    {
      "id": 3,
      "nombre": "El club de la lectura del refugio antiaéreo",
      "descripcion": "Novela escrita por A.Lyons",
      "autor": "Annie Lyons",
      "id_categoria": 3,
      "precio": 388,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073906760_1607.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 8
    },
    {
      "id": 4,
      "nombre": "Un hombre iluminado",
      "descripcion": "Novela escrita por B.Sanderson",
      "autor": "Brandon Sanderson",
      "id_categoria": 1,
      "precio": 579,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 35
    },
    {
      "id": 5,
      "nombre": "Nuestras resistencias",
      "descripcion": "Obra compuesta. Novela de varios autores",
      "autor": "Varios autores",
      "id_categoria": 2,
      "precio": 225,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/t/m/tmp9786078941209_14d5.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 25
    },
    {
      "id": 6,
      "nombre": "El club de la lectura del refugio antiaéreo",
      "descripcion": "Novela escrita por A.Lyons",
      "autor": "Annie Lyons",
      "id_categoria": 3,
      "precio": 388,
      "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073906760_1607.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
      "existencias": 10
    }
  ]

  ngOnInit(): void {
    this.dataSource = this.productos
  }

}
