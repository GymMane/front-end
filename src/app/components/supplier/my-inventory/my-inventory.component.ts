import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from "../../../popups/add-product/add-product.component";
import { stockStatus } from '../../../models/stockStatus.model';
import { category } from '../../../models/category.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MyInventoryService } from '../../../services/supplier/my-inventory.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss']
})
export class MyInventoryComponent implements OnInit {

  //Initial values
  @ViewChild('previewTable') previewTable: MatTable<any>;
  @ViewChild('stockTable') stockTable: MatTable<any>;

  hoverListIndex: number = -1;
  activeCatIndex: number = 0;
  categoryList: category[] = [];
  selectedCategory: category;
  previewTableColumns: string[] = ['Num', 'Image', 'Product', 'Type', 'Weight', 'Description', 'Quantity', 'Quality', 'Edit', 'Delete'];
  previewTablesData: any = new MatTableDataSource<any>([]);
  stockTableColumns: string[] = ['Num', 'Image', 'CategoryName', 'Product', 'Weight', 'Description', 'Quantity', 'QualityCategory', 'SuppliedDate', 'Demand', 'Delete'];
  stockTableData: any = new MatTableDataSource<any>([]);
  showPreviewTable: boolean = false;

  //   "GymPIN": "MYS00004",
  //   "ProductCategoryID":"1",
  // "QualityCategoryID":"1",
  // "Quantity":"6",
  // "Demand":"High",
  // "Description":"Basic Pedals",
  // "SupplierLoginID":"10",
  // "Image":"",
  // "Product":{
  //   "TechnologyType":"Analog"
  // }

  constructor(
    public dialog: MatDialog,
    private myInventoryService: MyInventoryService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getCatrgoryList();
    this.getStocks();
  }

  //Get category list from API
  getCatrgoryList(): void {
    this.myInventoryService.getCatrgoryList().subscribe(
      categoryResponse => {
        console.log(categoryResponse);
        this.categoryList = categoryResponse;
        this.selectedCategory = categoryResponse[0];
      },
      categoryError => {
        console.log(categoryError)
      }
    );
  }

  //Get submmitted stocks from API
  getStocks(): void {
    this.myInventoryService.getStocks().subscribe(
      stockResponse => {
        console.log(stockResponse);
        this.stockTableData.data = stockResponse;

      },
      stockError => {
        console.log(stockError)
      }
    );
  }

  //Select category from left list
  selectCategory(category, index): void {
    this.activeCatIndex = index;
    this.selectedCategory = category;
  }

  //Add product to inventory 
  addProduct(): void {

    //Open add product popup
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        product: this.selectedCategory,
        GymPIN: "MYS00004",
        ProductCategoryID: this.selectedCategory.CategoryID,
        QualityCategoryID: "",
        Weight: "",
        Height: "",
        Quantity: "",
        Demand: "High",
        Description: "",
        SupplierLoginID: "10",
        Image: "",
        Product: {
          TechnologyType: ""
        },
        action: "add"
      },
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === "add") {
        console.log(result)
        const { action, ...tableRow } = result.data;
        const tableData = [...this.previewTablesData.data];
        tableData.push(tableRow)
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
        console.log(addResponse);

      },
      addError => {
        console.log(addError);
      }
    )
  }

}




