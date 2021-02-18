import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  //Intial values
  hoverListIndex: number = -1;
  activeCatIndex: number = 0;
  categoryList: category[] = [];
  @Output() selectCategoryEvent = new EventEmitter<category>();

  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getCatrgoryList();
  }

  //Get category list from API
  getCatrgoryList(): void {
    this.categoryService.getCatrgoryList().subscribe(
      categoryResponse => {
        this.categoryList = categoryResponse;

        if (JSON.parse(this.profileService.getUserInfo().userInfo).User.RoleID === 3) {

          this.categoryList.splice(0, 0, {
            CategoryID: 0,
            CategoryName: "All Products",
            CategoryDescription: null,
            Height: [],
            Image: "",
            Material: [],
            Quality: [],
            Technology: [],
            Weight: [],
            ImageBlack: "http://www.gymmane.com/assets/images/WT_Black.png",
            ImageWhite: "http://www.gymmane.com/assets/images/WT_White.png"
          });

        }

        this.selectCategory(this.categoryList[0], 0);

      },
      categoryError => {
        console.log(categoryError)
      }
    );
  }

  //Select category from left list event
  selectCategory(category: category, index: number) {
    this.activeCatIndex = index;
    this.selectCategoryEvent.emit(category);
  }

}
