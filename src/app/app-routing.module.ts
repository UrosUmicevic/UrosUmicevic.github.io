import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user.component';
import { AddUserComponent } from './components/add-user.component';
const routes: Routes = [
  {path:'user', component: UserComponent},
  {path:'addUser', component: AddUserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
