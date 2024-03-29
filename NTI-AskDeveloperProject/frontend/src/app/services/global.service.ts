import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isLoggedIn = true;
  public navbar =true
  public userInfo:any = {}
    constructor(private http : HttpClient) { }

  getUser(obj:any):Observable<any>{
    return this.http.post("http://localost:2000/api/user/register",obj)
  }
  Userlogin(obj:any):Observable<any>{
    return this.http.post(`http://localhost:2000/api/user/login` , obj)
   }
   UserLogout():Observable<any>{
     return this.http.get(`http://localhost:2000/api/user/logout`)
   }
   getme():Observable<any>{
    return this.http.get("http://localhost:2000/api/user/me")
  }
  AuthLogin(){
    this.http.get("http://localhost:2000/api/user/me").subscribe(data=>{
      this.userInfo = data
      localStorage.setItem('userInfo',JSON.stringify(data))
    })
    return this.userInfo;
  }
  editUser(id:string,obj:any):Observable<any>{
    return this.http.post(`http://localhost:2000/api/user/editprofile/${id}`,obj)
  }
  getAllUsers():Observable<any>{
    return this.http.get("http://localhost:2000/api/user/allusers")
  }
  addQuestion(obj:any):Observable<any>{
    return this.http.post("http://localhost:2000/api/questions/addquestion",obj)
  }
  getmyAllQuestions():Observable<any>{
    return this.http.get("http://localhost:2000/api/questions/getAllmyquestions")
  }
  getAllUsersQuestions():Observable<any>{
    return this.http.get("http://localhost:2000/api/questions/getAllUsersQuestions")
  }
  addAnswer(obj:any,id:any):Observable<any>{
    return this.http.post(`http://localhost:2000/api/questions/AddAnswer/${id}`,obj)
  }
}
