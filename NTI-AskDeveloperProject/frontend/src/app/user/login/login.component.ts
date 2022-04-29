import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)])
  })
  token = localStorage.getItem('token')
  constructor(private _global:GlobalService, private toastr:ToastrService,private router: Router) {
    this._global.navbar = false
    this._global.isLoggedIn=false;
    if(this.token) {
      this.router.navigateByUrl('/home')
    }
   }
  isSubmitted = false;

  get LoginData(){
    return this.data.controls;
  }
  ngOnInit(): void {
  }
  handleSubmit(){
    this.isSubmitted =true
    if(this.data.valid){
      this._global.Userlogin(this.data.value).subscribe(res=>{
        console.log(res)
        if(res.error){
          this.toastr.error(res.error)
        }
        else{
          //const token = req.headers.get('Authorization');
          this.toastr.success("Login Successfully")
          localStorage.setItem('token',res.data.token)
          this._global.isLoggedIn=true;
          this._global.navbar = true

          this.router.navigate(['/home'])
        }
      } , (err)=>{
        this.toastr.error("Error in Login")
      })
    }
  }
  canExit():boolean{
    if(this.isSubmitted == false && this.data.dirty == false){
        alert("Please Save Changes")
        return true;
     }
      else{
        return false;
      }
    }



}
