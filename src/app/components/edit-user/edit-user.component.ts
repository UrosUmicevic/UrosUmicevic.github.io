import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/user';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

interface Role {
  value: string;
  viewValue: string;
}

interface Location{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
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
      name: new FormControl('',[Validators.required,Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, AgeValidator, Validators.pattern('[0-9]{2}')]),
      location: new FormControl('',[Validators.pattern('[a-zA-Z]*$'), Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      phone: new FormControl('',[Validators.pattern('[+()0-9]{10,15}')]),
      contractStartDate: new FormControl('',[Validators.required]),
      contractEndDate: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.maxLength(30)])

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
      this.currentUser.contractStartDate = res.contractStartDate;
      this.currentUser.contractEndDate = res.contractEndDate;
      this.currentUser.description = res.description;


      console.log(this.currentUser);

    this.form.reset({
      name: this.currentUser.name,
      email: this.currentUser.email,
      role: this.currentUser.role,
      age: this.currentUser.age,
      location: this.currentUser.location,
      phone: this.currentUser.phone,
      contractStartDate: this.currentUser.contractStartDate,
      contractEndDate: this.currentUser.contractEndDate,
      description: this.currentUser.description,


    });

  
    });
  }

  updateUser(){
    this.userService.update(this.id_string, this.form.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/user'], { relativeTo: this.route });
    });
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



