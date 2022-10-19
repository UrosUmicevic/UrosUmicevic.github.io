import { Component, OnInit } from '@angular/core';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';

const ELEMENT_DATA: User[] = [
  { id: 1, name: 'Uros', email: 'umicevic.uros998@gmail.com', role: 'admin1', age: 24, location: 'Belgrade', phone: 444333, },
  { id: 2, name: 'Ognjen', email: 'pejcinovic.ognjen@gmail.com', role: 'admin', age: 28, location: 'Belgrade', phone: 333444, },
  { id: 3, name: '', email: '', role: '', age: 0, location: '', phone: 0, },
  { id: 4, name: '', email: '', role: '', age: 0, location: '', phone: 0, },
  { id: 5, name: '', email: '', role: '', age: 0, location: '', phone: 0, },
  { id: 6, name: '', email: '', role: '', age: 0, location: '', phone: 0, },
  { id: 7, name: '', email: '', role: '', age: 0, location: '', phone: 0, },
];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'age', 'location', 'phone'];
  dataSource = ELEMENT_DATA;

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });;
  }
  deleteUser(users: User){

  }
}
