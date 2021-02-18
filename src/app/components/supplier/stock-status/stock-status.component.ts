import { Component, OnInit } from '@angular/core';
import { stockStatus } from '../../../models/stockStatus.model';
import { ProfileService } from '../../../services/profile.service';
import { StockStatusService } from '../../../services/supplier/stock-status.service';
import { MatTableDataSource } from '@angular/material/table';

const stockStatusTableData: stockStatus[] = []

@Component({
  selector: 'stock-status',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.scss']
})
export class StockStatusComponent implements OnInit {

  stockStatusColumns: string[] = ['num', 'Status', 'OrderID', 'ProductCategory', 'ProductPIN', 'Description', 'IssuedDate', 'ReturnDate', 'ExtendedDate', 'PaymentStatus', 'DeliveryStatus', 'Remark'];
  stockStatusData: any = new MatTableDataSource<any>([]);

  constructor(
    private profileService: ProfileService,
    private stockStatusService: StockStatusService) { }

  ngOnInit(): void {
    this.getStockStatus();
  }

  //Get stocks status from API
  getStockStatus(): void {
    const supplierId = JSON.parse(this.profileService.getUserInfo().userInfo)["SupplierInfo"]["LoginID"];

    this.stockStatusService.getStocksStatus(supplierId).subscribe(
      stockResponse => {
        this.stockStatusData.data = stockResponse;
      },
      stockError => {
        console.log(stockError)
      }
    );
  }

}
