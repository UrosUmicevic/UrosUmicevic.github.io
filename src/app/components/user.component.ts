import { Component, OnInit } from '@angular/core';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';



const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  id!: number;
  user!: User;
  
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'age', 'location', 'phone', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });;

  }
  
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(data => {
      console.log(data);
      location.reload();
    })
  }

}
