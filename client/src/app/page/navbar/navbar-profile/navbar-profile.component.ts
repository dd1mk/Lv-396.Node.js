import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';
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
    this.avatar = this.user.photoURL || 'assets/img/userimg.jpg';
    this.newTasksCount = 7;
  }

  loadUser(): boolean {
    this.userService.getUser()
      .subscribe(user => this.user = user);

    return false;
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);

    return false;
  }

  currentPage(): boolean {
    this.menuList.map(item => item.current = item.id === 'my-profile');

    return false;
  }

  changeCurrent(i): boolean {
    this.menuList.map((item, index) => item.current = index === i);
    if (this.menuList[i].logout) {
      this.logout();
    }

    return false;
  }
}
