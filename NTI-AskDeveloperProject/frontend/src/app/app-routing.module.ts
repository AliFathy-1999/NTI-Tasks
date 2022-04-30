import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { UsersComponent } from './pages/users/users.component';
import { AddquestionComponent } from './user/addquestion/addquestion.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import {CabActivateChildGuard} from './guards/cab-activate-child.guard';
import { DeActivateGuard } from './guards/de-activate.guard';
import { EditprofileComponent } from './user/editprofile/editprofile.component';
import { MyquestionsComponent } from './user/myquestions/myquestions.component';
const routes: Routes = [
  { path: '', redirectTo:"home" , pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
   { path: 'login', component: LoginComponent, canActivate: [CanActivateGuard] },
  //,canDeactivate: [DeActivateGuard]

  { path: 'register', component: RegisterComponent, canActivate: [CanActivateGuard]},
  { path: 'myprofile', component: UserprofileComponent},
  { path: 'editprofile', component: EditprofileComponent, },
  { path: 'tags', component:TagsComponent },
  { path: 'users', component:UsersComponent , canActivate: [CanActivateGuard] },
  { path: 'addquestion', component:AddquestionComponent },
  { path: 'myquestion', component:MyquestionsComponent },
  { path: 'question',
  canActivateChild:[CabActivateChildGuard],
  children: [
    { path: '', component: AddquestionComponent },
  ]},
  {path : 'logout', redirectTo: 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
