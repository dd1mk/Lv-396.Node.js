import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../../../app_models/department';
import { DepartmentService } from '../../../app_services/department.service';
import { OptionPair } from '../../../app_models/option-pair';
import data from '../../../../assets/data/data.json';
import { UserService } from "../../../app_services/user.service";

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  departmentsOptionPair: OptionPair[] = [];
  departments: IDepartment[] = [];
  departmentId: any;
  positions: OptionPair[] = [];
  teamLeads: OptionPair[] = [];
  teamLeadId: any;
  roles: OptionPair[] = [];
  managers: OptionPair[] = [];
  positionId: string;
  // id = _id;

  constructor(private departmentService: DepartmentService, private userService: UserService) {
  }

  retrieveSelectedDepartment($event) {
    this.departmentId = $event;
    console.log(this.departmentId);
    this.positions = this.departments.filter(elem => elem._id == $event)[0].position.map(e => new OptionPair(e, e));
  }

  retrieveSelectedTeamleadId($event) {
    this.teamLeadId = $event;
    console.log(this.teamLeadId);
  }

  retrieveSelectedPosition($event) {
    this.positionId = $event;
    console.log(this.positionId);
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departmentsOptionPair = data.map(o => new OptionPair(o._id, o.name));
      this.departments=data;
    });

    this.userService.getAll().subscribe( data => {
      this. teamLeads = data.map( elem => new OptionPair(elem.id, elem.firstName + ' ' + elem.lastName));
    });

    this.userService.getAll().subscribe( data => {
      this. roles = data.map( elem => new OptionPair(elem.id, elem.firstName))
    });

    this.userService.getAll().subscribe( data => {
      this. managers = data.map( elem => new OptionPair(elem.id, elem.position))
    });
  }

}
