import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { UserProfile } from '../modules/userProfile';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  userProfiles: UserProfile[] = [];
  jsonDataResult: any;
  private userSubject!: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getUserbyId(id: string | null | undefined){
    return this.http.get<User>('http://localhost:3000/user/' + id);
  }

  addUser(user: User) {
   return this.http.post('http://localhost:3000/user', user);
  }

  addUserProfile(userProfile: UserProfile) {
    return this.http.post('http://localhost:3000/userProfile', userProfile);
   }

  delete(id: number) {
    const deleteEndpoint = 'http://localhost:3000/user/' + id;
    return this.http.delete(deleteEndpoint);
  }

  deleteAll(){
    return this.http.delete('http://localhost:3000/user');
 }

  update(id: string | null | undefined, params: any) {
        return this.http.put('http://localhost:3000/user/' + id, params);
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  login(username: any, password: any) {
    return this.http.post<User>('http://localhost:3000/user/', { username, password })
        .pipe(map((user: any) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}
}