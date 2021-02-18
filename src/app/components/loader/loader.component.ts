import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.getLoaderState().subscribe(state => {
      this.showLoader = state;
    });
  }

}
