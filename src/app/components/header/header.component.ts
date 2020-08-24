import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //Initial values
  navList: { text: string, url: string }[] = [
    { text: "Stock Status", url: "/stock-status" },
    { text: "My Inventory", url: "/my-inventory" },
    { text: "Others", url: "/others" }
  ];
  navIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
