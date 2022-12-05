import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { UserProfile } from '../modules/userProfile';
import { AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  userProfiles: UserProfile[] = [];
  jsonDataResult: any;
  private url = 'http://localhost:3000/userProfile/'

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getUserbyId(id: string | null | undefined) {
    return this.http.get<User>('http://localhost:3000/user/' + id);
  }

  addUser(user: User) {
    return this.http.post('http://localhost:3000/user', user);
  }

  addUserProfile(userProfile: UserProfile) {
    return this.http.post('http://localhost:3000/userProfile', userProfile);
  }

  getUserProfileById(id: string) {
    return this.http.get<UserProfile>('http://localhost:3000/userProfile/' + id)
  }

  getAllUserProfiles() {
    return this.http.get<any[]>('http://localhost:3000/userProfile/')
  }

  delete(id: number) {
    const deleteEndpoint = 'http://localhost:3000/user/' + id;
    return this.http.delete(deleteEndpoint);
  }

  deleteAll() {
    return this.http.delete('http://localhost:3000/user');
  }

  update(id: string | null | undefined, params: any) {
    return this.http.put('http://localhost:3000/user/' + id, params);
  }

  login() {
    return this.http.get<any>('http://localhost:3000/userProfile')
  }

  logout() {
    localStorage.removeItem('UserProfile');
  }

  checkUsername(username: any) {
    return this.http.get<any[]>('http://localhost:3000/userProfile/'+ username)
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}