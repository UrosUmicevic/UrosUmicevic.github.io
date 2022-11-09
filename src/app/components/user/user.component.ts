import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';
import { MatSort, Sort, } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';


const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  id!: number;
  user!: User;
 
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'age', 'location', 'phone', 'contractStartDate','contractEndDate','description','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe!: DatePipe;

  
  form = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.form.get('fromDate')?.value; }
  get toDate() { return this.form.get('toDate')?.value; }

  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,)
     {}

    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyDateFilter() {
    
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data, filter) =>{
    var ed= new Date (data.contractEndDate); 
      
    if (this.fromDate && this.toDate) {
      return ed >= this.fromDate && ed <= this.toDate;     
    } 
    else if(this.fromDate){
      return ed >= this.fromDate;
    }
    else (this.toDate);{
      return ed <= this.toDate;
    }   
  }    
    console.log('test');
    
    this.dataSource.filter = ''+ Math.random();
    console.log(this.dataSource.filter);
    console.log(this.dataSource);
    
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
    
    console.log(this.dataSource.filter);
    console.log(this.dataSource);
    
  }
  
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(data => {
      console.log(data);
      location.reload();
    })
  }
}
