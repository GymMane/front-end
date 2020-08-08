import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navList: string[] = ["Stock Status", "My Inventory", "Others"];
  navIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
