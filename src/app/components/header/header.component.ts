import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { userInfo } from '../../models/user.model';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Initial values
  navList: { text: string, url: string }[] = [
    { text: 'Stock Status', url: '/stock-status' },
    { text: 'My Inventory', url: '/my-inventory' },
    { text: 'Others', url: '/others' },
    { text: 'Home', url: '/home' },
    { text: 'My Orders', url: '/my-orders' },
    { text: 'My Kit', url: '/my-kit' }
  ];
  userRoleId = '';
  routeConfig: any = null;
  routerUrl: any = null;
  userInfo: any = null;

  constructor(
    private router: Router,
    private profileService: ProfileService) { }

  ngOnInit(): void {

    this.routeConfig = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url;
      });

    const profileInfo = this.profileService.getUserInfo();

    if (profileInfo) {
      this.userInfo = JSON.parse(profileInfo.userInfo);
      this.userRoleId = this.userInfo.User.Role;
    } else {
      this.userRoleId = '';
      this.userInfo = null;
    }

  }

  ngOnDestroy() {
    this.routeConfig.unsubscribe();
  }

  // logout and clear data
  logout() {
    this.profileService.clearUserInfo();
    this.router.navigate(['/']);
  }

  // Navigate to home on click of logo
  navigateToHome() {
    const profileInfo = this.profileService.getUserInfo();

    if (JSON.parse(profileInfo.userInfo).User.RoleID === 2) {
      this.router.navigate(['/stock-status']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
