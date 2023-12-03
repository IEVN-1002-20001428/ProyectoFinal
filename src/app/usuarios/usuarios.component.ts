import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dataSource: any = [];

  obtenerUsuarios() {
    const url = 'http://localhost:5000/usuarios';

    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.dataSource.push(data);
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

}
