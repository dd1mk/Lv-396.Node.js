import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../common/models/user';

import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {


  @Output() readonly sendContacts: EventEmitter<[]> = new EventEmitter<[]>();
  @Output() readonly sendMContacts: EventEmitter<[]> = new EventEmitter<[]>();

  profileForm: FormGroup;
  contactsForm: FormGroup;
  user: User;
  contacts;
  MContacts;
  addContacts;
  allContacts;
  id: string;

  constructor(private readonly userInfoService: UserService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder) {

    this.profileForm = fb.group({});

    this.contactsForm = fb.group({
      form_contacts: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.checkIdParam();
    console.log(this.id);
    if (this.id) {
      this.loadUser(this.id);
    } else {
      this.user = new User();
      this.profileForm = this.fb.group({
        email: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
        phone: new FormControl('', { validators: Validators.required, updateOn: 'blur' })
      });
    }

    this.addContacts = [];
    this.contacts = [];
    this.allContacts = [];
    this.MContacts = [];
  }

  getData(contacts: []): void {
    this.addContacts = contacts;
    this.updateData();
  }

  updateData(): void {
    this.contacts = this.form_contacts.value;
    this.mergeContacts();
    this.sendContacts.emit(this.allContacts);
  }
  updateMContact(): void {
    this.MContacts = this.profileForm.value;
    console.log(this.MContacts);
    this.sendMContacts.emit(this.MContacts);
  }

  mergeContacts(): void {
    this.allContacts = [...this.contacts, ...this.addContacts];
  }

  private readonly loadUser = (id: string) => {
    this.userInfoService.getUser(this.id)
      .subscribe((user) => {
        this.user = user;
        this.contacts = user.contacts;
        this.setForm(this.contacts);
        this.setProfileForm(user.phone, user.email);
      });
  };

  private readonly checkIdParam = () => {
    this.id = this.route.snapshot.paramMap.get('id');
  };

  private getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  private setForm(contacts: []): void {
    contacts.forEach(element => {
      this.form_contacts.push(
        this.fb.group({
          contact_name: new FormControl(element['contact_name'], { validators: Validators.required, updateOn: 'blur' }),
          contact_value: new FormControl(element['contact_value'], { validators: Validators.required, updateOn: 'blur' })
        })
      );
    });
  }

  private setProfileForm(phone, email): void {
    this.profileForm = this.fb.group({
      email: new FormControl(email, { validators: Validators.required, updateOn: 'blur' }),
      phone: new FormControl(phone, { validators: Validators.required, updateOn: 'blur' })
    });
  }

  get form_contacts(): FormArray {
    return this.contactsForm.get('form_contacts') as FormArray;
  }

}
