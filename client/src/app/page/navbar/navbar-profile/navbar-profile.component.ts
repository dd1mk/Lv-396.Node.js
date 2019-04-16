import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../app_services/user.service';
import { User } from '../../../app_models/user';
import { NavItemsService } from '../../common/nav-items.service';
import { NavItem } from '../../common/nav-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})

export class NavbarProfileComponent implements OnInit {
  user = new User();
  avatar: string;
  newTasksCount: number;
  menuList: NavItem[];
  userType: string;
  active: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navItemsService: NavItemsService,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.newTasksCount = 7;
  }

  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.avatar = user.photoURL || 'assets/img/userimg.jpg';
        this.user = user;
      });
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);

    return false;
  }

  currentByRout(currentRouter: string): boolean {
    this.navItemsService.currentRouter(currentRouter);
    this.active = false;

    return false;
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);
    if (this.menuList[i].logout) {
      this.menuList[i].current = false;
      this.logout();
    }

    return false;
  }

  trackById(link: any): string {
    return link.id;
  }
}
