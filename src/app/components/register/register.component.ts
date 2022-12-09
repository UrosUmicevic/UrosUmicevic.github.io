import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/modules/userProfile';
import { debounce, debounceTime, map, Observable, switchMap, tap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modules/user';

@Component({
  selector: '[app-register]',
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
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-Z]*$'), Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      {
        validators: this.mustMatch('password', 'confirmPassword')
      },
    );

    this.userService.getAllUserProfiles().subscribe(res => {
      this.userProfiles = res;
    });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl && !confirmPasswordControl) {
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

  addNewUserProfile() {
    if (this.checkIfUsernameExist(this.registerForm.value)) {
    this.registerForm.get('username')?.setErrors({ invalid: 'Invalid Username' });    }
    else {
      this.userService.addUserProfile(this.registerForm.value).subscribe((res) => {
        console.log(res);
        this.router.navigate(['../login'], { relativeTo: this.route });
      })
    }
  }

  checkIfUsernameExist(userProfile: UserProfile): boolean {

    let userExist = false;
    let newUser = this.registerForm.get('username');

    for (let index = 0; index < this.userProfiles.length; index++) {
      if (newUser?.value === this.userProfiles[index].username) {
        userExist = true;
      }

    }
    return userExist;
  }

  get username() {
    return this.registerForm.get('username')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }


}

