import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StockStatusComponent } from './components/supplier/stock-status/stock-status.component';
import { MyInventoryComponent } from './components/supplier/my-inventory/my-inventory.component';
import { OthersComponent } from './components/supplier/others/others.component';
import { HomeComponent } from './components/customer/home/home.component';
import { MyOrdersComponent } from './components/customer/my-orders/my-orders.component';
import { MyKitComponent } from './components/customer/my-kit/my-kit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock-status', component: StockStatusComponent, canActivate: [AuthGuard] },
  { path: 'my-inventory', component: MyInventoryComponent, canActivate: [AuthGuard] },
  { path: 'others', component: OthersComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'my-kit', component: MyKitComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
