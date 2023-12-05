import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './interfaces/producto';

@Pipe({
  name: 'libros'
})
export class LibrosPipe implements PipeTransform {

  transform(value: Producto[], args: string): Producto[] {

    let filter: string = args ? args.toLocaleLowerCase() : '';
    return filter
      ? value.filter((libro: Producto) =>
        libro.nombre.toLocaleLowerCase().indexOf(filter) != -1)
      : value;
  }

}
