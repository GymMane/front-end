import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';

//Component imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { StockStatusComponent } from './components/supplier/stock-status/stock-status.component';
import { MyInventoryComponent } from './components/supplier/my-inventory/my-inventory.component';
import { OthersComponent } from './components/supplier/others/others.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './popups/add-product/add-product.component';
import { HomeComponent } from './components/customer/home/home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
//End

//Angular Material imports
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MyOrdersComponent } from './components/customer/my-orders/my-orders.component';
import { MyKitComponent } from './components/customer/my-kit/my-kit.component';
//End

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoaderComponent,
    StockStatusComponent,
    MyInventoryComponent,
    OthersComponent,
    ProfileComponent,
    AddProductComponent,
    HomeComponent,
    CategoryListComponent,
    MyOrdersComponent,
    MyKitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  bootstrap: [AppComponent]
})
export class AppModule { }
