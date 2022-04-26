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
  constructor(private _global:GlobalService, private toastr:ToastrService,private router: Router) { }
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
          this.toastr.error("Error in Login")
        }
        else{
          //const token = req.headers.get('Authorization');
          this.toastr.success("Login Successfully")
          localStorage.setItem('token',res.token)
          this.router.navigate(['/home'])
        }
      } , (err)=>{
        this.toastr.warning("Error in Login")
      })
    }
  }
}
