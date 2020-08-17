import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddProductComponent } from "../../../popups/add-product/add-product.component";

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss']
})
export class MyInventoryComponent implements OnInit {

  categoryList: { CategoryID: number, CategoryName: string, Description: string, Image: string, name: string }[] = [
    {
      Image: "assets/images/equipments/adjustable-dumbbells-hd-png.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Dumbbell",
      Description: ""
    },
    {
      Image: "assets/images/equipments/Barbell-PNG-Background-Image.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Barbell",
      Description: ""
    },
    {
      Image: "assets/images/equipments/CLSC_Lifecycle_Hero.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Cycle",
      Description: ""
    },
    {
      Image: "assets/images/equipments/dumbbell_PNG.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Threadmill",
      Description: ""
    },
    {
      Image: "assets/images/equipments/Threadmills.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Supporting Benches",
      Description: ""
    },
    {
      Image: "assets/images/equipments/weight_plate_PNG.png",
      name: "Cycle",
      CategoryID: 2,
      CategoryName: "Cardio",
      Description: ""
    }
  ];

  hoverListIndex: number = -1;
  activeCatIndex: number = 0;
  selectedCategory: string = "Dumbbell";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  selectCategory(category, index) {
    this.activeCatIndex = index;
    this.selectedCategory = category.CategoryName;
  }

  addProduct() {
    const modalReference = this.modalService.open(AddProductComponent, {
      windowClass: "modal-class",
      centered: true,
      backdrop: "static",
      keyboard: false
    });

    modalReference.componentInstance.modal = modalReference;
    modalReference.componentInstance.category = this.selectedCategory;
    // modalReference.componentInstance.countryList = this.countryList;
  }

}
