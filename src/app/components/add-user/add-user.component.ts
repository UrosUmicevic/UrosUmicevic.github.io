import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modules/user';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm, } from '@angular/forms';
import { Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

interface Role {
  value: string;
  viewValue: string;
}

interface Location{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css']
})


export class AddUserComponent implements OnInit {

  roles: Role[] = [
    {value: 'Administrator', viewValue: 'Administrator'},
    {value: 'QA', viewValue: 'QA'},
    {value: 'Developer', viewValue: 'Developer'},
    {value: 'Customer', viewValue: 'Customer'},
  ];

  locations: Location[] = [
    {value: 'Belgrade', viewValue: 'Belgrade'},
    {value: 'Novi Sad', viewValue: 'Novi Sad'},
    {value: 'Nis', viewValue: 'Nis'}
  ];

  submitted = false;
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
      name: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$/'), Validators.maxLength(15)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, AgeValidator, Validators.pattern('[0-9]{2}')]),
      location: new FormControl('',),
      phone: new FormControl('',[Validators.pattern('[+()0-9]{8,15}')]),
      contractStartDate: new FormControl('',[Validators.required,]),
      contractEndDate: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.maxLength(30)])
    })
  }

  addNewUser() {
    this.userService.addUser(this.form.value).subscribe((res) => { 
      console.log(res);
      this.router.navigate(['../user'], { relativeTo: this.route });
    })
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
  get role(){
    return this.form.get('role')
  } 
  get phone(){
    return this.form.get('phone')
  } 
  get contractStartDate(){
    return this.form.get('contractStartDate')
  }
  get contractEndDate(){
    return this.form.get('contractEndDate')
  }
  get description(){
    return this.form.get('description')
  }
}
export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value < 18) {
    return { 'age': true };
  }
  return null;
}
