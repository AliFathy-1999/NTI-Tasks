import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // public apiUrl = "http://localhost:2000/"
  // public apiUserUrl = "api/user/"
  public baseUrl = "http://dashboard.roshetah.com/api/"
  public imgUrl = "http://dashboard.roshetah.com/storage/app/public/"
  public isLoggedIn = true;
  public navbar =true
    constructor(private http : HttpClient) { }

  getUser(obj:any):Observable<any>{
    return this.http.post("http://localhost:2000/api/user/register",obj)
  }
  Userlogin(obj:any):Observable<any>{
    return this.http.post(`http://localhost:2000/api/user/login` , obj)
   }
   UserLogout():Observable<any>{
     return this.http.get(`http://localhost:2000/api/user/logout`)
   }
   getAllBlogs(obj:any , pageNum:any):Observable<any>{
    return this.http.post(`${this.baseUrl}auth/blog/1/${pageNum}/2` , obj)
  }
}
