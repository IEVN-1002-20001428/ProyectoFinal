import { Component, OnInit } from '@angular/core';
import { CarritoItem } from '../interfaces/producto';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  productos: CarritoItem[] = [];
  total = 0;

  ngOnInit(): void {
    this.obtener();
    this.obtenerTotal();
  }

  obtener(): any[] {
    const productosGuardados = localStorage.getItem('Productos');

    if (productosGuardados) {
      try {
        this.productos = JSON.parse(productosGuardados);
        return JSON.parse(productosGuardados);
      } catch (error) {
        console.error('Error al analizar productos desde localStorage:', error);
      }
    }
    return [];
  }

  obtenerTotal() {
    for (let i = 0; i < this.productos.length; i++) {
      this.total += this.productos[i].total || 0;
    }
  }

}
