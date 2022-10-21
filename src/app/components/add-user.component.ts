import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addMode!: boolean;
  form!: FormGroup;
  users: User[] = []
  user!: User;
  id!: number;
  currentUser!: User;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addMode = !this.id;
    
    this.userService.getUserbyId(this.id).subscribe(x => this.form.patchValue(x));
    
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

  // onAddOrEdit(){
  //   this.loading = true;
  //   if(this.addMode){
  //     this.addNewUser();
  //   }
  //   else{
  //     this.userService.update(this.id, this.user);
  //   }
  // }
  addNewUser() {
    if(!this.addMode)
      this.userService.addUser(this.form.value);
    else
      this.userService.update(this.id, this.user)
      
      
  }
  updateUser(id: number) {

    this.userService.getUserbyId(id).subscribe((res) => {
      this.currentUser = res;
      console.log(res);
    });
    console.log(this.currentUser);
 
    this.form.setValue({
     id:this.currentUser.id,
     name: this.currentUser.name,
     email: this.currentUser.email,
     role: this.currentUser.role,
     age: this.currentUser.age,
     location: this.currentUser.location,
     phone: this.currentUser.phone
 
    })
   }
}