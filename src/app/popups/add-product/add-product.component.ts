import { Component, OnInit, Input, Inject } from '@angular/core';
import { MyInventoryService } from '../../services/supplier/my-inventory.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  data: any = {};
  action: string = "";
  type: string = "";
  quality: string = "";
  weight: string = "";
  height: string = "";

  constructor(
    private myInventoryService: MyInventoryService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public popupData
  ) {
    this.data = { ...popupData };
    console.log(this.data)
    this.action = popupData.action;
  }

  ngOnInit(): void {
    // this.myInventoryService.addProduct().subscribe(response => console.log(response), error => console.log(error));
  }

  addProduct(): void {
    let addProduct = {
      ...this.data,
      Type: this.type,
      Product: this.data.product.CategoryName,
      Quality: this.quality,
      Weight: this.weight,
      Height: this.height
    };

    this.dialogRef.close({
      event: this.action,
      data: addProduct
    });
  }

  onDropDownChange(value, fieldName) {
    this[fieldName] = value;
  }

}
