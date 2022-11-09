import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators, ValidationErrors} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/modules/userProfile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  userProfiles: UserProfile[] = [];


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.pattern ('[a-zA-Z]*$'), Validators.maxLength(15)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required]),
  },
  {
    validators:this.mustMatch('password','confirmPassword')
  }
  );
}

mustMatch(password: string, confirmPassword: string) {
  return(formGroup: AbstractControl): ValidationErrors | null=>{
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if(!passwordControl && !confirmPasswordControl){
      return null;
    }
    if (
      confirmPasswordControl?.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null;
    }
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  };
  }
addNewUser() {
  this.userService.addUserProfile(this.registerForm.value).subscribe((res) => { 
    console.log(res);
    this.router.navigate(['../login'], { relativeTo: this.route });
  })
}


get username(){
  return this.registerForm.get('username')
}
get password(){
  return this.registerForm.get('password')
}
get confirmPassword(){
  return this.registerForm.get('confirmPassword')
}

  // formSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
  //   const username = formData.value.username;
  //   const password = formData.value.password;
  //   const confirmPassword = formData.value.confirmPassword;
  //   this.router.navigate(['../login'], { relativeTo: this.route });
  // }
}
