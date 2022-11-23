import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
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
  loading = false;
  submitted = false;
  userData: any;


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.createForm();

  }
  get f() { return this.loginForm.controls; }

  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.pattern ('[0-9a-zA-Z]*$'), Validators.maxLength(15)]),
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

    // if(this.isLoginOk(this.loginForm)){
    //   this.router.navigate(['../user'], { relativeTo: this.route });
    // }
    // else {
    //   return;
    // }
  } 

  isLoginOk(loginForm: FormGroup){
    this.userService.login().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.username == this.loginForm.value.username && a.password == this.loginForm.value.password
      });

      if(user){
        alert('You have succesfully logged in!');
        this.loginForm.reset();
        this.router.navigate(['../user']), { relativeTo: this.route }
      }
      else{
        alert('User not found');
        this.router.navigate(['login']);
      }
    });
  }

  // isLoginOk(): boolean{
  //   let userProfile : UserProfile[] = [];
  //   this.userService.getAllUserProfiles().subscribe(result => {
  //     userProfile = result;
  //   });

  //   for (let index = 0; index < userProfile.length; index++) {
  //     const username = userProfile[index].username;
  //     console.log(userProfile);
    
  //     if(userProfile[index].username == 'uros') {
  //       this.loginForm.get('password')?.value == userProfile.password;
  //     }
  //     }
  //   }
  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
