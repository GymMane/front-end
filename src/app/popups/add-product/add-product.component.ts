import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MyInventoryService } from '../../services/supplier/my-inventory.service';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() category: string;
  quality: string = "";
  description: string = "";
  quantity: number = 0;
  constructor(public modal: NgbActiveModal, private myInventoryService: MyInventoryService) { }

  ngOnInit(): void {
    this.myInventoryService.addProduct().subscribe(response => console.log(response), error => console.log(error));
  }

}
