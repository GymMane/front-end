import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from '../../../services/customer/my-orders.service';
import { ProfileService } from '../../../services/profile.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  stockStatusColumns: string[] = ['num', 'Image', 'OrderID', 'CategoryName', 'IssuedDate', 'ReturnDate', 'ExtendedDate', 'Price', 'Status', 'ValueOfProduct'];
  stockStatusData: any = new MatTableDataSource<any>([]);

  constructor(
    private myOrdersService: MyOrdersService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    const customerId = JSON.parse(this.profileService.getUserInfo().userInfo)["User"]["LoginID"];
    this.getOrders(customerId);
  }

  //Get orders list from API
  getOrders(customerId): void {

    this.myOrdersService.getOrders(customerId).subscribe(
      ordersResponse => {
        this.stockStatusData.data = ordersResponse;
      },
      ordersError => {
        console.log(ordersError)
      }
    );
  }

}
