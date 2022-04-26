import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // public apiUrl = "http://localhost:2000/"
  // public apiUserUrl = "api/user/"
  constructor(private http : HttpClient) { }
  getUser(obj:any):Observable<any>{
    return this.http.post("http://localhost:2000/api/user/register",obj)
  }
  Userlogin(obj:any):Observable<any>{
    return this.http.post(`http://localhost:2000/api/user/login` , obj)
   }
}
