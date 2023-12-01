import { Component, OnInit } from '@angular/core';
import { CarritoItem, Producto } from '../interfaces/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  id_producto: number = 0;
  cantidad = 1;
  productos: CarritoItem[] = [];

  titulo = 'Un hombre iluminado';
  autor = 'Brandon Sanderson';
  categoria = 'Ciencia ficción';
  descripcion = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur aliquam quam earum aliquid, quasi odio laudantium vitae, et consectetur minus eveniet exercitationem temporibus iure impedit dolore. Earum, impedit ipsam. Pariatur. Esse, ab? Voluptates facere in dolorum veritatis suscipit odio quibusdam laborum, accusantium quas autem iusto, recusandae dolorem. Rerum neque exercitationem fuga quaerat voluptatibus aut voluptatem quia fugit nisi reprehenderit!Enim!. Qui illum libero repellat repellendus quos facilis? Temporibus, dolore. Dolor quasi ratione illo alias fuga facere eius impedit magnam culpa ipsum. At nostrum beatae repellat aut voluptates laboriosam accusantium quidem!Est veritatis laudantium dignissimos voluptates quaerat nulla! Amet sit tempore neque, ad, aliquam quibusdam temporibus deserunt expedita quas voluptatum ullam perspiciatis eos! Enim, aliquam atque a quas aut consectetur eos.Vitae molestiae aspernatur harum quis.';
  precio = 579;
  imagen = 'https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300';
  existencias = 100;
  dataSource: any = [];

  // productos: Producto[] = [
  //   {
  //     "id": 1,
  //     "nombre": "Un hombre iluminado",
  //     "descripcion": "Novela escrita por B.Sanderson",
  //     "autor": "Brandon Sanderson",
  //     "id_categoria": 1,
  //     "precio": 579,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 10
  //   },
  //   {
  //     "id": 2,
  //     "nombre": "Nuestras resistencias",
  //     "descripcion": "Obra compuesta. Novela de varios autores",
  //     "autor": "Varios autores",
  //     "id_categoria": 2,
  //     "precio": 225,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/t/m/tmp9786078941209_14d5.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 15
  //   },
  //   {
  //     "id": 3,
  //     "nombre": "El club de la lectura del refugio antiaéreo",
  //     "descripcion": "Novela escrita por A.Lyons",
  //     "autor": "Annie Lyons",
  //     "id_categoria": 3,
  //     "precio": 388,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073906760_1607.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 8
  //   },
  //   {
  //     "id": 4,
  //     "nombre": "Un hombre iluminado",
  //     "descripcion": "Novela escrita por B.Sanderson",
  //     "autor": "Brandon Sanderson",
  //     "id_categoria": 1,
  //     "precio": 579,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 35
  //   },
  //   {
  //     "id": 5,
  //     "nombre": "Nuestras resistencias",
  //     "descripcion": "Obra compuesta. Novela de varios autores",
  //     "autor": "Varios autores",
  //     "id_categoria": 2,
  //     "precio": 225,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/t/m/tmp9786078941209_14d5.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 25
  //   },
  //   {
  //     "id": 6,
  //     "nombre": "El club de la lectura del refugio antiaéreo",
  //     "descripcion": "Novela escrita por A.Lyons",
  //     "autor": "Annie Lyons",
  //     "id_categoria": 3,
  //     "precio": 388,
  //     "imagen": "https://www.gandhi.com.mx/media/catalog/product/9/7/9786073906760_1607.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
  //     "existencias": 10
  //   }
  // ]

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.id_producto = parseInt(idString, 10);
    }
    //this.dataSource = this.productos;
  }

  validateUser(): boolean {
    let userType = this.authService.getUserType();
    if (userType === 'cliente') {
      return true;
    } else {
      Swal.fire('Error', 'Favor de inciar sesión para proceder con la compra', 'error');
      return false;
    }
  }

  validateForm(): boolean {
    if (this.cantidad == 0 || !this.cantidad || this.cantidad > this.existencias) {
      Swal.fire('Error', 'Ingrese una cantidad correcta', 'error');
      return false;
    }
    return true;
  }

  agregarCarrito(event: Event) {
    event.preventDefault();

    try {
      if (!this.validateUser() || !this.validateForm()) {
        return;
      }

      this.obtener();

      if (!this.existe(this.id_producto)) {

        let producto = {
          "id": this.id_producto,
          "nombre": 'Un hombre iluminado',
          "imagen": 'https://www.gandhi.com.mx/media/catalog/product/9/7/9786073836722_2a84.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300',
          "autor": 'Brandon Sanderson',
          "cantidad": this.cantidad,
          "precio": 579,
          "total": 1000
        }

        this.productos.push(producto);
        this.guardar();

      } else {

        let productoExistente = this.productos.find(producto => producto.id === this.id_producto);

        if (productoExistente) {
          if (productoExistente.cantidad + 1 <= this.existencias) {
            productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
            this.guardar();
          } else {
            Swal.fire('Error', 'La cantidad agregada sobrepasa el stock actual', 'error');
          }
        }
      }

    } catch (error) {
      console.error('Error en agregarCarrito:', error);
    }
  }

  guardar() {
    localStorage.setItem('Productos', JSON.stringify(this.productos));
    Swal.fire('', 'Agregado a la cesta', 'success');
  }

  existe(id: number) {
    return this.productos.find(producto => producto.id === id);
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

}
