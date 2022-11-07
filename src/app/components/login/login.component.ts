import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  username!: string;
  password!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(10)]),
      password: new FormControl('',[Validators.required])
    })
  }

  formSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    const username = formData.value.username;
    const password = formData.value.password;
  }

}
