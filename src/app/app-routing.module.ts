import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StockStatusComponent } from './components/supplier/stock-status/stock-status.component';
import { MyInventoryComponent } from './components/supplier/my-inventory/my-inventory.component';
import { OthersComponent } from './components/supplier/others/others.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock-status', component: StockStatusComponent },
  { path: 'my-inventory', component: MyInventoryComponent },
  { path: 'others', component: OthersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
