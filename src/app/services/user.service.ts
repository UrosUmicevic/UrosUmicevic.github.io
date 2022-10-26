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
  }

  getUserbyId(id: string | null | undefined) {
    return this.http.get<User>('http://localhost:3000/user/' + id);
  }

  addUser(user: User) {
    this.http.post('http://localhost:3000/user', user).subscribe((res) => {
      console.log(res);
      this.router.navigate(['../user'], { relativeTo: this.route });
    })
  }

  delete(id: number) {
    const deleteEndpoint = 'http://localhost:3000/user/' + id;
    return this.http.delete(deleteEndpoint);
  }

  deleteAll(){
    return this.http.delete('http://localhost:3000/user');
 }

  update(id: string | null | undefined, params: any) {
    this.router.navigate(['../user'], { relativeTo: this.route });
    return this.http.put('http://localhost:3000/user/' + id, params);
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}