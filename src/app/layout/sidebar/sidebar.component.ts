import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User , MessagingService} from '../../shared/index';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/history', title: 'History',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  myProfile: User;

  constructor(private authSvc : AuthenticationService, private msgService : MessagingService) { }

  ngOnInit() {
    this.myProfile = this.authSvc.getUserInfo();
    this.initMessaging();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  private initMessaging(){
    this.msgService.getPermission();
    this.msgService.receiveMessage();
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  signOut(){
    this.authSvc.logout();
  }
}
