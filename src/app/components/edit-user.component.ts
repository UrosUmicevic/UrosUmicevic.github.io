import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../modules/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  id!: number;
  users: User[] = []
  // user!: User;
  form!: FormGroup;
  currentUser!: User;

  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute ) { }
  
    user = new User;

  ngOnInit(): void {

    this.route.paramMap.subscribe();
    this.updateUser(this.id)

    // this.form = new FormGroup({
    //   id: new FormControl(),
    //   name: new FormControl(),
    //   email: new FormControl(),
    //   role: new FormControl(),
    //   age: new FormControl(),
    //   location: new FormControl(),
    //   phone: new FormControl(),
    // })
  }

  updateUser(id: number) {

    this.userService.getUserbyId(id).subscribe((res) => {
      this.currentUser = res;
      console.log(res);
    });
    console.log(this.currentUser);
    
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
      age: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),
    })

    this.form.setValue({
      id: this.currentUser.id,
      name: this.currentUser.name,
      email: this.currentUser.email,
      role: this.currentUser.role,
      age: this.currentUser.age,
      location: this.currentUser.location,
      phone: this.currentUser.phone

    })
  }
}

