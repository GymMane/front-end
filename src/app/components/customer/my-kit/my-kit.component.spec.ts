import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyKitComponent } from './my-kit.component';

describe('MyKitComponent', () => {
  let component: MyKitComponent;
  let fixture: ComponentFixture<MyKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
