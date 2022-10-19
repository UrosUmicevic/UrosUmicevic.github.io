import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  url = 'http://localhost:3000/'
  jsonDataResult: any;

  constructor(
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) {

  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/user');
    /* .subscribe((res) => {
      this.jsonDataResult = res;
      console.log('--- result :: ', this.jsonDataResult);
    }); */
  }

  addUser(user: User) {
    this.http.post('http://localhost:3000/user', user).subscribe((res) => {
      console.log(res);
    })
  }    

  isChecked(){
    this.router.navigate(['../user'], {relativeTo: this.route});
  }

  delete(user: User) {
    return this.http.delete<User[]>('http://localhost:3000/user');
 }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}