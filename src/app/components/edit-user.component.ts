import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../modules/user';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  id_string: string | null | undefined;
  id!: number;
  users: User[] = [];
  // user!: User;
  form!: FormGroup;
  currentUser!: User;

  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ) { }
  
    user = new User;

  ngOnInit(): void {
    
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl('',[Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(10)]),
      email: new FormControl('',[Validators.email]),
      role: new FormControl(),
      age: new FormControl(),
      location: new FormControl('',[Validators.pattern('[a-zA-Z]*$'),Validators.minLength(2),Validators.maxLength(20)]),
      phone: new FormControl('',[Validators.pattern('[+()0-9]{10,15}')]),
    });

    this.id_string = this.route.snapshot.paramMap.get('id');
    this.currentUser = new User();

    this.userService.getUserbyId(this.id_string).subscribe((res) => {
      this.currentUser.name = res.name;
      this.currentUser.email = res.email;
      this.currentUser.role = res.role;
      this.currentUser.age = res.age;
      this.currentUser.location = res.location;
      this.currentUser.phone = res.phone;

      console.log(this.currentUser);

    this.form.reset({
      name: this.currentUser.name,
      email: this.currentUser.email,
      role: this.currentUser.role,
      age: this.currentUser.age,
      location: this.currentUser.location,
      phone: this.currentUser.phone
    });

  
    });
  }

  updateUser(){
    this.userService.update(this.id_string, this.form.value).subscribe()
      console.log(this.currentUser);
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



