import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { TagsComponent } from './pages/tags/tags.component';
import { AddquestionComponent } from './user/addquestion/addquestion.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserInterceptor } from './interceptor/user.interceptor';
import { BlogsComponent } from './pages/blogs/blogs.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UsersComponent,
    TagsComponent,
    AddquestionComponent,
    UserprofileComponent,
    RegisterComponent,
    LoginComponent,
    BlogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
