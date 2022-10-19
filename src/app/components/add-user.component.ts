import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form!: FormGroup;
  users: User[] = []
  user!: User;
  checked!: boolean;

  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    /*this.form = this.formbuilder.group({
      id: [],
      name: [''],
      email: [''],
      role: [''],
      age: [],
      location: [''],
      phone: [],
    });*/

    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
      age: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),

    })
  }

  addNewUser() {
    this.userService.addUser(this.form.value);
    if (this.checked == true) {
      this.userService.isChecked();
    }
    else {
      return;
    }


  };



  /* window.alert('User has been added'); */
  /*this.user.age = 22;
this.user.name = '';
this.user.email = '';
this.user.location = '';
this.user.phone = 1111;
this.user.role = '';*/
}