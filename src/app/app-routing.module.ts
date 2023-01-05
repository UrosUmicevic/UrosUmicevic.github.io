import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {path:'user', component: UserComponent, title:'User'},
  {path:'addUser', component: AddUserComponent, title:'Add User'},
  {path:'editUser/:id', component: EditUserComponent, title:'Edit User'},
  {path:'register', component: RegisterComponent, title:'Register User'},
  {path:'', component: LoginComponent, title:'Login'},

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
