import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Department } from '../../../common/models/department';
import { DepartmentService } from '../../../common/services/department.service';
import { OptionPair } from '../../../common/models/option-pair';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';
import { Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-create-update-side-bar-info',
  templateUrl: './create-update-side-bar-info.component.html',
  styleUrls: ['./create-update-side-bar-info.component.scss']
})
export class CreateUpdateSideBarInfoComponent implements OnInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();

  @Input() user: User;
  departmentsOptionPair: OptionPair[] = [];
  departments: Department[] = [];
  positions: OptionPair[] = [];
  teamLeads: OptionPair[] = [];
  hrs: OptionPair[] = [];
  managers: OptionPair[] = [];
  ifChosenDevelopmentDepartment = false;
  ifChosenHrDepartment = false;
  warningForChoosingDepartment: boolean;
  @Input() showModal: boolean;

  constructor(readonly departmentService: DepartmentService,
              readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllTeamLeads()
      .takeUntil(this.destroy$)
      .subscribe((data: any) => {
          this.teamLeads = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
        },
      );

    this.userService.getAllHr()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.hrs = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
      });

    this.userService.getAllManagers()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.managers = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
      });
  }

  warningToChooseDepartmentFirst(): void {
    this.warningForChoosingDepartment = this.user.department ? false : true;

    setTimeout(() => {
      this.warningForChoosingDepartment = false;
    }, 3000);
  }

  ngOnChanges(): void {
    if (this.user.department) {
      if (this.user.department.name === 'Development') {
        this.ifChosenDevelopmentDepartment = true;
      }
    }
    this.departmentService.getAllDepartments()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.departmentsOptionPair = data.map(o => new OptionPair(o._id, o.name));
        this.departments = data;
        if (this.user.department) {
          this.positions = this.departments
            .filter(elem => elem._id === this.user.department._id)[0].position
            .map(e => new OptionPair(e, e));
        }
      });
  }

  selectDepartment(id: any): void {
    this.user.department = id;
    this.ifChosenDevelopmentDepartment = id === '5cab28b4e5773a19a4462fd1';
    this.ifChosenHrDepartment = id === '5cb9c437b5cfd134acc5783e';
    this.positions = this.departments
      .find(elem => elem._id === id).position
      .map(e => new OptionPair(e, e));
    this.userService.chosenDepartment.emit();
  }


  updateAvatar(newURL: string): void {
    this.user.photoURL = newURL;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
