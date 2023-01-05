import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, destroyPlatform } from '@angular/core';
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';
import { MatSort, Sort, } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { from, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {

  users: User[] = [];
  id!: number;
  user!: User;
  userDisplayName!: any;
  userSubscription!: Subscription;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'age', 'location', 'phone', 'contractStartDate', 'contractEndDate', 'description', 'actions'];
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
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe((users) => {
      let currentLoggedInUser = localStorage.getItem('UserProfile')
      for (let index = 0; index < users.length; index++) {

        if (currentLoggedInUser == users[index].createdBy) {

          this.dataSource.data.push(users[index]);
          this.dataSource._updateChangeSubscription();
        }
        else {
          null;
        }
      }
    });

    this.userDisplayName = localStorage.getItem('UserProfile')

  }

  ngOnDestroy() {
    for (let index = 0; index < this.dataSource.data.length; index) {
      this.dataSource.data.pop();
    } console.log('end');

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyDateFilter() {

    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data, filter) => {
      var ed = new Date(data.contractEndDate);

      if (this.fromDate && this.toDate) {
        return ed >= this.fromDate && ed <= this.toDate;
      }
      else if (this.fromDate) {
        return ed >= this.fromDate;
      }
      else (this.toDate); {
        return ed <= this.toDate;
      }
    }
    this.dataSource.filter = '' + Math.random();
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

  logoutUserProfile() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}

