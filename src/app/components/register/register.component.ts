import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  username!: string;
  password!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(10)]),
      password: new FormControl('',[Validators.required])
    })
  }

  formSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    const username = formData.value.username;
    const password = formData.value.password;
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
