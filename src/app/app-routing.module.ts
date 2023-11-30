import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nuevoProducto', component: NuevoproductoComponent },
  { path: 'inventario', component: InventarioComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
