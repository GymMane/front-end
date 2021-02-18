import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from "../../../popups/add-product/add-product.component";
import { stockStatus } from '../../../models/stockStatus.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MyInventoryService } from '../../../services/supplier/my-inventory.service';
import { category } from '../../../models/category.model';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss']
})
export class MyInventoryComponent implements OnInit {

  //Initial values
  @ViewChild('previewTable') previewTable: MatTable<any>;
  @ViewChild('stockTable') stockTable: MatTable<any>;

  selectedCategory: category = null;
  previewTableColumns: string[] = ['Num', 'Image', 'Product', 'typeDesc', 'weightDesc', 'heightDesc', 'Quantity', 'Quality', 'Description', 'Edit', 'Delete'];
  previewTablesData: any = new MatTableDataSource<any>([]);
  stockTableColumns: string[] = ['Num', 'Image', 'CategoryName', 'Demand', 'Weight', 'Quantity', 'QualityCategory', 'SuppliedDate', 'Description', 'Delete'];
  stockTableData: any = new MatTableDataSource<any>([]);
  showPreviewTable: boolean = false;

  constructor(
    public dialog: MatDialog,
    private myInventoryService: MyInventoryService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getStocks();
  }

  //Get submmitted stocks from API
  getStocks(): void {
    const supplierId = JSON.parse(this.profileService.getUserInfo().userInfo)["SupplierInfo"]["LoginID"];

    this.myInventoryService.getStocks(supplierId).subscribe(
      stockResponse => {
        console.log(stockResponse);
        this.stockTableData.data = stockResponse;
      },
      stockError => {
        console.log(stockError)
      }
    );
  }

  //Add product to inventory 
  addProduct(): void {

    const supplierInfo = JSON.parse(this.profileService.getUserInfo().userInfo)["SupplierInfo"];

    //Open add product popup
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        product: this.selectedCategory,
        GymPIN: supplierInfo.GymPIN,
        ProductCategoryID: this.selectedCategory.CategoryID,
        QualityCategoryID: "",
        typeDesc: "",
        weightDesc: "",
        heightDesc: "",
        Quantity: "",
        Demand: "High",
        Description: "",
        SupplierLoginID: supplierInfo.LoginID,
        Image: "",
        action: "add"
      },
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === "add") {
        const { action, ...tableRow } = result.data;
        const tableData = [...this.previewTablesData.data];
        tableData.push(tableRow);
        this.previewTablesData = new MatTableDataSource<any>(tableData);
        this.showPreviewTable = true;
      }
    });
  }

  //Edit preview table row
  editRow(row, rowIndex) {

    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        ...row,
        action: "edit"
      },
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === "edit") {
        const { action, ...tableRow } = result.data;
        this.previewTablesData.data[rowIndex] = tableRow;
        this.previewTable.renderRows();
      }
    });
  }

  //Delete preview table row
  deletePreviewTableRow(rowIndex: number): void {
    this.previewTablesData.data.splice(rowIndex, 1);
    this.previewTable.renderRows();
  }

  //Delete stock table row
  deleteStockTableRow(rowIndex: number, stockId: number): void {
    this.myInventoryService.deleteStock(stockId).subscribe(
      deleteResponse => {
        if (deleteResponse) {
          this.stockTableData.data.splice(rowIndex, 1);
          this.stockTable.renderRows();
        }
      },
      deleteError => {
        console.log(deleteError)
      }
    );
  }

  submitPreview() {
    this.myInventoryService.addProduct(this.previewTablesData.data).subscribe(
      addResponse => {
        if (addResponse) {
          this.previewTablesData.data = [];
          this.previewTable.renderRows();
          this.getStocks();
          this.showPreviewTable = false;
        }
      },
      addError => {
        console.log(addError);
      }
    )
  }

}




