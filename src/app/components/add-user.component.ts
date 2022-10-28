import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form!: FormGroup;
  users: User[] = []
  user!: User;
  id!: number;

  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl(''),
      age: new FormControl('',[Validators.required, Validators.pattern('[0-9]{2}')]),
      location: new FormControl('',[Validators.pattern('[a-zA-Z]*$'),Validators.minLength(2),Validators.maxLength(20)]),
      phone: new FormControl('',[Validators.pattern('[+()0-9]{10,15}')]),
    })

  }
  addNewUser() {
    this.userService.addUser(this.form.value);
  }

  get name(){
    return this.form.get('name')
  }
  get email(){
    return this.form.get('email')
  }
  get age(){
    return this.form.get('age')
  }
  get location(){
    return this.form.get('location')
  } 
}