import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarClienteComponent } from './navbar-cliente/navbar-cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EntregasComponent } from './entregas/entregas.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComprasComponent } from './compras/compras.component';
import { NuevoclienteComponent } from './nuevocliente/nuevocliente.component';
import { NuevoadminComponent } from './nuevoadmin/nuevoadmin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { EditarproductoComponent } from './editarproducto/editarproducto.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibrosPipe } from './libros.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NuevoproductoComponent,
    InventarioComponent,
    AdminComponent,
    NavbarAdminComponent,
    NavbarClienteComponent,
    NavbarComponent,
    ClientesComponent,
    EntregasComponent,
    LoginComponent,
    ProductoComponent,
    ComprasComponent,
    NuevoclienteComponent,
    NuevoadminComponent,
    PerfilComponent,
    UsuariosComponent,
    EditarusuarioComponent,
    EditarproductoComponent,
    LibrosPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
