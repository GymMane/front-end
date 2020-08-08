import { Component, OnInit } from '@angular/core';
import { stockStatus } from '../../models/stockStatus.model';

const stockStatusTableData: stockStatus[] = [
  {
    num: 1,
    status: "On Duty",
    orderNum: 2020000001,
    pin: "MY00010001",
    description: "5kg St dB",
    issuedDate: "01.07.2020",
    dueDate: "30.08.2020",
    extendedDate: "NA",
    payment: "Received",
    productStatus: "Delivered",
    remarks: "The product has been received back at Gym",
    color: "success"
  },
  {
    num: 2,
    status: "On Duty",
    orderNum: 2020000002,
    pin: "MY00010002",
    description: "7ft Bar with plates",
    issuedDate: "15.07.2020",
    dueDate: "14.08.2020",
    extendedDate: "18.08.2020",
    payment: "Received",
    productStatus: "Delivered",
    remarks: "Customer is enjoying the Product",
    color: "danger"
  },
  {
    num: 3,
    status: "On Duty",
    orderNum: 2020000003,
    pin: "MY00010003",
    description: "Bend Bench",
    issuedDate: "28.07.2020",
    dueDate: "27.08.2020",
    extendedDate: "NA",
    payment: "Received",
    productStatus: "Delivered",
    remarks: "Customer is enjoying the Product",
    color: "success"
  },
  {
    num: 4,
    status: "Way out",
    orderNum: 2020000004,
    pin: "MY00010003",
    description: "Skipping",
    issuedDate: "28.07.2020",
    dueDate: "NA",
    extendedDate: "NA",
    payment: "Received",
    productStatus: "Shipped",
    remarks: "On the way to customer delivery",
    color: "normal"
  },
  {
    num: 5,
    status: "Way out",
    orderNum: 2020000005,
    pin: "MY00010004",
    description: "Electic Cycle",
    issuedDate: "28.07.2020",
    dueDate: "NA",
    extendedDate: "NA",
    payment: "Received",
    productStatus: "Shipped",
    remarks: "On the way to customer delivery",
    color: "normal"
  }
];

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockStatusColumns: string[] = ['num', 'status', 'orderNum', 'pin', 'description', 'issuedDate', 'dueDate', 'extendedDate', 'payment', 'productStatus', 'remarks'];
  stockStatusData = stockStatusTableData;

  constructor() { }

  ngOnInit(): void {
  }

}
