import { HttpClient } from '@angular/common/http';
import { ResourceLoader, ReturnStatement } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/modules/userProfile';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { RegisterComponent } from '../register/register.component';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = 'User not found'
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  userData: any;
  isLoading = false;
  durationInSeconds = 5;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public snackBar: MatSnackBar
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

  isLoginOk(loginForm: FormGroup){
    this.userService.login().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.username == this.loginForm.value.username && a.password == this.loginForm.value.password
      });

      if(user){
        localStorage.setItem('UserProfile',user.username);
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: this.durationInSeconds * 300,
        });
        this.loginForm.reset();
        this.router.navigate(['../user']), { relativeTo: this.route }
      }
      else{
        this.snackBar.open(this.message);
        this.router.navigate(['login']);
      }
    });
  }

  load() : void {
    this.isLoading = true;
    setTimeout( () => this.isLoading = false, 2000 );
  }
  async wait(ms: number): Promise<void> {
		return new Promise<void>( resolve => setTimeout( resolve, ms) );
	}

  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
