import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AdminComponent } from './admin/admin.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EntregasComponent } from './entregas/entregas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProductoComponent } from './producto/producto.component';
import { ComprasComponent } from './compras/compras.component';
import { NuevoclienteComponent } from './nuevocliente/nuevocliente.component';
import { NuevoadminComponent } from './nuevoadmin/nuevoadmin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'nuevoProducto', component: NuevoproductoComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'entregas', component: EntregasComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'nuevo-usuario', component: NuevoadminComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'login', component: LoginComponent },
  { path: 'detalle-producto/:id', component: ProductoComponent },
  { path: 'mis-compras', component: ComprasComponent, canActivate: [AuthGuard], data: { allowedRoles: ['cliente'] } },
  { path: 'registrar', component: NuevoclienteComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { allowedRoles: ['cliente'] } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
