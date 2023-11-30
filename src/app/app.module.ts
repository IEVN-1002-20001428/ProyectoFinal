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
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
