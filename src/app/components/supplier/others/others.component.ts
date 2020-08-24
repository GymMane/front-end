import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  smileyIndex: number = -1;
  categoryIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  //Highlight smiley on click
  selectSmiley(index: number): void {
    this.smileyIndex = (this.smileyIndex === index) ? -1 : index;
  }

  //Highlight category on click
  selectCategory(index: number): void {
    this.categoryIndex = (this.categoryIndex === index) ? -1 : index;
  }



}
