import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';
import { MatSort, Sort, } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  id!: number;
  user!: User;


  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'age', 'location', 'phone', 'contractStartDate','contractEndDate','description','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe!: DatePipe;

  formFilter = new FormGroup({
    fromDate: new FormControl(null, { validators: [Validators.required]}),
    toDate: new FormControl(null, { validators: [Validators.required]})
  });
   


  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer) { 

    }

    

    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
      console.log(res);
    });;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  applyDateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.formFilter);
    
   }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(data => {
      console.log(data);
      location.reload();
    })
  }

  deleteAllUsers(){
      this.dataSource.data = [];
      location.reload();
  }

  onRefresh(){
    location.reload();
  }

}

