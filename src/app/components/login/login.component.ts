import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/user';
import { UserProfile } from 'src/app/modules/userProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  // username!: string;
  // password!: string;
  loading = false;
  submitted = false;
  userData: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.createForm();

  }
  get f() { return this.loginForm.controls; }

  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(15)]),
      password: new FormControl('',[Validators.required])
    })
  }

  formSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    const username = formData.value.username;
    const password = formData.value.password;
  }

  login(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }
    let userProfile = new UserProfile();
    
    this.loading = true;    
    this.userService.getUserProfileById(this.loginForm.get('id')?.value).subscribe(res => {      
      userProfile = res;
      console.log();
      
      });
    console.log(this.username);
    
    if(this.loginForm.get('password')?.value ==  userProfile.password){
      this.router.navigate(['../user'], { relativeTo: this.route });
    }
    else {
      return;
    }
    
  } 

  getAllUserProfiles(){
    let userProfile : UserProfile[];
    this.userService.getAllUserProfiles().subscribe(result => {
      userProfile = result;
    })
  }
  
  getUserProfileIdByUsername(username: string){

  }



  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
