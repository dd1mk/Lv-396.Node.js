import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../common/models/user';

@Component({
  selector: 'app-user-bar-info',
  templateUrl: './user-bar-info.component.html',
  styleUrls: ['./user-bar-info.component.scss']
})
export class UserBarInfoComponent implements OnInit {
  @Input() userinfo: User;

  constructor() {
  }

  ngOnInit() {
  }
}
