import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { UsersComponent } from './pages/users/users.component';
import { AddquestionComponent } from './user/addquestion/addquestion.component';
import { LoginComponent } from './user/login/login.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'login', component: LoginComponent},
    //******* Test route (add user/api/routename)*******
  { path: 'tags', component:TagsComponent },
  { path: 'users', component:UsersComponent },
  { path: 'addquestion', component:AddquestionComponent },
  {path : 'profile', component:UserprofileComponent},
  {path : 'logout', redirectTo: 'home'},
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
