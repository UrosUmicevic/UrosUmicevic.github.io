import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user.component';
import { AddUserComponent } from './components/add-user.component';
import { EditUserComponent } from './components/edit-user.component';
const routes: Routes = [
  {path:'user', component: UserComponent},
  {path:'addUser', component: AddUserComponent},
  {path:'editUser/:id', component: EditUserComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
