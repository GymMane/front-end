import { Component, OnInit } from '@angular/core';
import { category } from '../../../models/category.model';
import { HomeService } from '../../../services/customer/home.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Initial values
  selectedCategory: category;
  productList: any = [];

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;

  constructor(
    private homeService: HomeService,
    private profileService: ProfileService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  //Get products list from API
  getProducts(productId): void {
    this.homeService.getProducts(productId).subscribe(
      productResponse => {
        this.productList = productResponse;
      },
      productError => {
        console.log(productError)
      }
    );
  }

  //On change of category
  selectCategory(category) {
    this.selectedCategory = category;
    this.getProducts(category.CategoryID)
  }

  //Rent products from product list
  rentProduct(product) {
    if (!product.IsRented) {
      const customerId = JSON.parse(this.profileService.getUserInfo().userInfo)["User"]["LoginID"];

      const productDetails = [{
        LoginID: customerId,
        ProductID: product.ProductID,
        ProductPIN: product.ProductPIN,
        GymPIN: product.GymPIN,
        DeviceID: "1234:1234:a8c:5cs:1234:1244:1234:123",

        ReturnDate: "2020-09-10",
        SupplierLoginID: product.SupplierLoginID
      }];

      this.homeService.rentProducts(productDetails).subscribe(
        rentProdResponse => {
          console.log(rentProdResponse)
          // this.productList = rentProdResponse;
          this.router.navigate(["/my-orders"]);
        },
        rentProdError => {
          console.log(rentProdError)
        }
      );
    }
  }

  countStar(star) {
    this.selectedValue = star;
  }

  addClass(star) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }
  }

  removeClass(star) {
    let ab = "";
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

}
