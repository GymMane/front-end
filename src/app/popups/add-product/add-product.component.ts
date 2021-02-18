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
  type: string = "";
  quality: string = "";
  weight: string = "";
  height: string = "";
  typeList: any = [];

  constructor(
    private myInventoryService: MyInventoryService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public popupData
  ) {
    this.data = { ...popupData };
    console.log(this.data)
    this.typeList = (this.data.product.Material.length > 0) ? this.data.product.Material : this.data.product.Technology;

    if (popupData.action === "edit") {
      this.type = this.data.typeDesc;
      this.weight = this.data.weightDesc;
      this.height = this.data.heightDesc;
    }
  }

  ngOnInit(): void {
    // this.myInventoryService.addProduct().subscribe(response => console.log(response), error => console.log(error));
  }

  addProduct(): void {
    const productDetils = {};
    productDetils["TechnologyTypeID"] = this.data.product.Technology.length > 0 ? this.data.type : "";
    productDetils["MaterialTypeID"] = this.data.product.Material.length > 0 ? this.data.type : "";
    productDetils["WeightCategoryID"] = this.data.product.Weight.length > 0 ? this.data.weight : "";
    productDetils["HeightCategoryId"] = this.data.height;

    let addProduct = {
      ...this.data,
      typeDesc: this.type,
      weightDesc: this.weight,
      heightDesc: this.height,
      Quality: this.quality,
      Product: { ...productDetils }
    };

    this.dialogRef.close({
      event: this.data.action,
      data: addProduct
    });
  }

  onDropDownChange(value, fieldName) {
    this[fieldName] = value;
  }

}
