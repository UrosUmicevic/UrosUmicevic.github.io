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
  isAddMode!: boolean;
  checked!: boolean;
  id!: number;
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
      age: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),
    })

    if (!this.isAddMode) {
        this.userService.getUserbyId(this.id).subscribe(x => this.form.patchValue(x));
    }
  }
  addNewUser() {
    this.userService.addUser(this.form.value);
  }
  updateUser() {
    this.userService.update(this.form.value);
  }
}