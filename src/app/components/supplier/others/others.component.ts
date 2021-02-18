import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  smileyIndex: number = -1;
  // categoryIndex: number = -1;
  rating: number = 1;
  // feedbackCategory: string = "";
  feedbackText: string = "";

  constructor(
    private feedbackService: FeedbackService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  //Highlight smiley on click
  selectSmiley(index: number, rating: number): void {
    this.rating = (this.smileyIndex === index) ? 1 : rating;
    this.smileyIndex = (this.smileyIndex === index) ? -1 : index;
  }

  //Highlight category on click
  // selectCategory(index: number): void {
  //   this.categoryIndex = (this.categoryIndex === index) ? -1 : index;
  // }

  giveFeedback() {
    const supplierId = JSON.parse(this.profileService.getUserInfo().userInfo)["SupplierInfo"]["LoginID"];

    const feedback = {
      LoginID: supplierId,
      Rating: this.rating,
      FeedbackText: this.feedbackText
    };

    this.feedbackService.giveFeedback(feedback).subscribe(
      feedbackResponse => {
        console.log(feedbackResponse);
      },
      feedbackError => {
        console.log(feedbackError)
      }
    );

  }
}
